import { useState } from 'react';
import { supabase, supabaseAdmin } from "~/utils/supabase";
import useRestaurant from "./useResturant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useCurrentUser from './useCurrentUser';
import { SupabaseTables } from '~/utils/types';

interface StaffMember {
  id: string;
  email: string;
  full_name: string;
  position: string;
  image_url: string;
}

interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  position: string;
  phone_number?: string;
}

interface UpdateStaffMember {
  id: string;
  position: string;
  phone_number?: string;
  email: string
}

export default function useRestaurantStaff() {
  const { resturant } = useRestaurant();
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const [signUpError, setSignUpError] = useState<string | null>(null);


  async function signUpStaff(data: SignUpData) {
    // Sign up the user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      user_metadata: {
        full_name: data.full_name,
        image_url:  `https://api.dicebear.com/9.x/initials/png?seed=${data.full_name}`,
        username: data.full_name.toLowerCase().replace(" ", ""),
        user_type: "vendor",
        phone_number: data.phone_number
      },
    });

    if (authError) throw new Error(authError.message);

    if (authData.user) {
      // Add record to restaurant-staff table
      const { error: staffError } = await supabase
        .from('restaurant-staff')
        .insert({ 
          staff_id: authData.user.id,
          position: data.position,
          restaurant_id: resturant?.id,
        });

      if (staffError) throw new Error(staffError.message);
    }
  }

  async function getRestaurantStaff() {
    const { data, error } = await supabase
      .from('restaurant-staff')
      .select(`
        staff_id,
        position,
        is_online,
        profiles:staff_id (id, email, full_name, image_url)
      `)
      .eq('restaurant_id', resturant?.id);

    if (error) throw new Error(error.message);

    return data.map((item: any) => ({
      id: item.staff_id,
      email: item.profiles.email,
      full_name: item.profiles.full_name,
      position: item.position,
      image_url: item.profiles.image_url,
    })) as StaffMember[];
  }

  async function updateStaffMember(staffMember: UpdateStaffMember) {
    const { id, position, ...rest } = staffMember;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ ...rest })
      .eq('id', id);

    if (profileError) throw new Error(profileError.message);

    const { error: staffError } = await supabase
      .from('restaurant-staff')
      .update({ position: position })
      .eq('staff_id', staffMember.id)
      .eq('restaurant_id', resturant?.id);

    if (staffError) throw new Error(staffError.message);

    return id;
  }

  async function deleteStaffMember(id: string) {
    const res = await supabaseAdmin.auth.admin.deleteUser(id);
    if (res.error) throw new Error(res.error.message);

    await Promise.all([
      supabase
        .from('restaurant-staff')
        .delete()
        .eq('staff_id', id)
        .eq('restaurant_id', resturant?.id),
      supabase
        .from('profiles')
        .delete()
        .eq('id', id)
    ])
  }

  async function setStaffOnlineStatus({ staffId, online } : { staffId: string, online: boolean }) {
    const { error: staffError } = await supabase
    .from('restaurant-staff')
    .update({ is_online: online })
    .eq('staff_id', staffId)
    .eq('restaurant_id', resturant?.id);

    if (staffError) throw new Error(staffError.message);
  }

  async function getOnlineStatus() {
    const { error: staffError, data } = await supabase
    .from('restaurant-staff')
    .select('is_online')
    .eq('staff_id', currentUser?.id!)
    .eq('restaurant_id', resturant?.id)
    .single();

    if (staffError) throw new Error(staffError.message);
    return data.is_online;
  }

  const { data: isOnline } = useQuery({
    queryKey: ["is-online"],
    queryFn: getOnlineStatus,
    enabled: currentUser?.user_type !== "admin"
  })

  const { isLoading, data: staff, error } = useQuery({
    queryKey: ["restaurant-staff", resturant?.id],
    queryFn: getRestaurantStaff,
    enabled: !!resturant?.id,
  });

  const { mutateAsync: addStaffMember } = useMutation({
    mutationFn: signUpStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-staff"] });
      Toast.show({
        text1: "Staff member added successfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      setSignUpError(error.message);
      Toast.show({
        text1: "Failed to add staff member",
        text2: error.message,
        type: "error"
      });
    }
  });

  const { mutateAsync: updateStaff } = useMutation({
    mutationFn: updateStaffMember,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-staff"] });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });

      Toast.show({
        text1: "Staff member updated successfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to update staff member",
        text2: error.message,
        type: "error"
      });
    }
  });

  const { mutateAsync: setStaffOnline } = useMutation({
    mutationFn: setStaffOnlineStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-staff"] });

      Toast.show({
        text1: "Changed Online Status Sucessfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to change Online Status",
        text2: error.message,
        type: "error"
      });
    }
  });

  const { mutateAsync: deleteStaff } = useMutation({
    mutationFn: deleteStaffMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-staff"] });
      Toast.show({
        text1: "Staff member deleted successfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to delete staff member",
        text2: error.message,
        type: "error"
      });
    }
  })

  return {
    staff,
    isLoading,
    error,
    addStaffMember,
    updateStaff,
    signUpError,
    deleteStaff,
    setStaffOnline,
    isOnline,
    
  };
}