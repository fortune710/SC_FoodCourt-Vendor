import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { View } from 'react-native';
import { Text } from './ui/text';
import useAuth from '~/hooks/useAuth';
import useShowChangePasswordDialog from '~/hooks/useShowChangePasswordDialog';
import Toast from 'react-native-toast-message';

const ChangePasswordDialog = () => {
  const { changePassword } = useAuth();
  const { showDialog, error } = useShowChangePasswordDialog();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [dialogOpen, setDialogOpen] = useState(showDialog);


  const updatePassword = async () => {
    if (newPassword !== newPasswordConfirmation || !newPassword || !newPasswordConfirmation) {
      return Toast.show({
        type: "error",
        text1: "Passwords do not match"
      })
    }

    try {
      await changePassword(newPassword);
      setDialogOpen(false);
      return Toast.show({
        type: "success",
        text1: "Password changed successfully"
      })
    } catch {
      return Toast.show({
        type: "error",
        text1: "Password could not be changed"
      })
    }
    
  }

  if (!showDialog || !!error) return null;

  return (
    <AlertDialog open={dialogOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
            <AlertDialogTitle>
                <Text>Change Password</Text>
            </AlertDialogTitle>
            <AlertDialogDescription>
                <Text>Enter your current password and a new password below.</Text>
            </AlertDialogDescription>
        </AlertDialogHeader>

        <View className="flex flex-col gap-4 py-2">

          <View className="space-y-2">
            <Label nativeID="new">New Password</Label>
            <Input
              id="new"
              placeholder="Enter new password"
              secureTextEntry
              onChangeText={setNewPassword}
            />
          </View>

          <View className="space-y-2">
            <Label nativeID="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              placeholder="Confirm new password"
              secureTextEntry
              onChangeText={setNewPasswordConfirmation}
            />
          </View>
        </View>

        <AlertDialogFooter>
          <AlertDialogCancel onPress={() => setDialogOpen(false)}>
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={updatePassword}>
            <Text>Update Password</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePasswordDialog;