import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "my-uploads");

  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/datu9x2hp/image/upload",
    formData
  );
  return data;
};