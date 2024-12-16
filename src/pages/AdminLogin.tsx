import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, Auth } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/admin");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: 'light',
              style: {
                button: {
                  background: 'black',
                  color: 'white',
                  borderRadius: '6px',
                },
                anchor: {
                  color: 'gray',
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;