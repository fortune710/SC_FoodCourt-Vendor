import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '~/utils/supabase'; // Adjust this import based on your Supabase client location
//import useCurrentUser from './useCurrentUser';
import useResturant, {} from "~/hooks/useResturant"
import { decodeBase64 } from '~/utils/functions';

export const useImagePickerUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [imageUri, setImageUri] = useState<string|null>(null);
  const { resturant } = useResturant();

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      setError('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const pickAndUploadImage = async (bucketName: string, folderPath = 'logos') => {
    try {
      setIsLoading(true);
      setError(null);

      // Request permission first
      const hasPermission = await requestPermission();
      if (!hasPermission) return null;

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true
      });

      if (result.canceled) {
        return null;
      }

      const uri = result.assets[0].uri;
      setImageUri(uri);

      const res = decodeBase64(result.assets[0].base64!)

      // Generate unique filename
      const fileExt = uri.substring(uri.lastIndexOf('.') + 1);
      const fileName = `${resturant?.admin_id}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, res!, {
            contentType: `image/${fileExt}`
        });

        console.log(uploadError, "hwllo")

        if((uploadError as any).statusCode === "409") {
            await supabase.storage.from(bucketName).update(filePath, res!, {
                contentType: `image/${fileExt}`
            });
        } else {
          console.log(uploadError, "2");
          throw uploadError;
        }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

        console.log(publicUrl)

      return {
        uri,
        publicUrl,
        fileName: filePath
      };

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickAndUploadImage,
    isLoading,
    error,
    imageUri
  };
};