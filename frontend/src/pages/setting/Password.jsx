import { useState } from "react"
import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { updateUserPassword } from "@/services/user.service"

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const { loading, run } = useAsyncHandler()

  const handleUpdatePassword = run(
    async () => {
      await updateUserPassword({ currentPassword, newPassword, confirmNewPassword })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    },
    { successMessage: "Password updated successfully!" }
  )

  const handleCancel = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }
  return (
    <div>
      <div className="flex flex-col gap-2 py-8">
        <h3>Password</h3>
        <p className="text-secondary">Please enter your current password to change your password.</p>
      </div>
      <div className="border-secondary flex flex-col items-start justify-start gap-4 border-t py-8">
        <span className="w-1/3">
          <p className="text-secondary mb-2 font-semibold">Current password*</p>
          <Input
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value)
            }}
            placeholder="Username"
          />
        </span>
        <span className="w-1/3">
          <p className="text-secondary mb-2 font-semibold">New password*</p>
          <Input
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
            }}
            placeholder="Username"
          />
        </span>
        <span className="w-1/3">
          <p className="text-secondary mb-2 font-semibold">Confirm new password*</p>
          <Input
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value)
            }}
            placeholder="Username"
          />
        </span>
      </div>
      <div className="border-secondary flex items-start justify-end gap-4 border-t py-4">
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleUpdatePassword} loading={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  )
}

export default Password
