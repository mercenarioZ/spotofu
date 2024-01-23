import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (open) {
      uploadModal.onOpen();
    } else {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      // set loading state to true
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Please fill all the fields");
        return;
      }

      const uniqueId = uniqid();

      // upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Something went wrong while uploading the song file");
      }

      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error(
          "Something went wrong while uploading the thumbnail"
        );
      }

      // create a record in the database
      const { error: insertError } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (insertError) {
        // setIsLoading(false);
        return toast.error(insertError.message);
      }

      // if everything is successful, refresh the page
      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");

      // reset the form and close the modal
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong while uploading the song");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload a song"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Enter song title"
        />

        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Author"
        />

        <div>
          <div className="mb-1">Select a song file</div>

          <Input
            className="cursor-pointer"
            id="song"
            type="file"
            disabled={isLoading}
            {...register("song", { required: true })}
            accept=".mp3"
          />
        </div>

        <div>
          <div className="mb-1">Select a thumbnail</div>

          <Input
            className="cursor-pointer"
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button
          className="bg-green-500 w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
