import { useState } from 'react';
import { supabase } from "~/utils/supabase";
import useRestaurant from "./useResturant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

interface StaffMember {
  id: string;
  email: string;
  full_name: string;
  position: string;
}

interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  position: string;
}

export default function useRestaurantStaff() {
  const { resturant } = useRestaurant();
  const queryClient = useQueryClient();
  const [signUpError, setSignUpError] = useState<string | null>(null);

  async function signUpStaff(data: SignUpData) {
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          image_url:  `https://api.dicebear.com/9.x/initials/png?seed=${data.full_name}`,
          username: data.full_name.toLowerCase().replace(" ", ""),
          user_type: "vendor"
        },
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
        profiles:staff_id (id, email, full_name)
      `)
      .eq('restaurant_id', resturant?.id);

    if (error) throw new Error(error.message);

    return data.map((item: any) => ({
      id: item.staff_id,
      email: item.profiles.email,
      full_name: item.profiles.full_name,
      position: item.position,
    })) as StaffMember[];
  }

  async function updateStaffMember(staffMember: StaffMember) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: staffMember.full_name })
      .eq('id', staffMember.id);

    if (profileError) throw new Error(profileError.message);

    const { error: staffError } = await supabase
      .from('restaurant-staff')
      .update({ position: staffMember.position })
      .eq('staff_id', staffMember.id)
      .eq('restaurant_id', resturant?.id);

    if (staffError) throw new Error(staffError.message);
  }

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-staff"] });
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

  return {
    staff,
    isLoading,
    error,
    addStaffMember,
    updateStaff,
    signUpError,
  };
}