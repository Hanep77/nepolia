import { getCurrentUser } from "@/actions/user";
import EditProfileForm from "@/app/_components/editProfileForm";

export default async function EditProfile() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <div>404</div>
  }

  const userProfileInfo = {
    name: currentUser.name,
    username: currentUser.username,
    bio: currentUser.bio,
    image: currentUser.image
  }

  return <div className="py-4">
    <div className="border-b border-zinc-700 pb-4">
      <h2 className="text-center font-semibold text-xl">Edit Profile</h2>
    </div>
    <EditProfileForm userProfileInfo={userProfileInfo} />
  </div>
}
