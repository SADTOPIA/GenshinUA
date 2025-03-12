import CredentialsAuth from "@/components/credentials-auth";
import GoogleAuth from "@/components/google-auth";

export default function AuthForm() {
  return (
    <div className="background">
      <CredentialsAuth/>
      <GoogleAuth/>
    </div>
  );
}
