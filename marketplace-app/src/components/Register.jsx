import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "grey.900",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          bgcolor: "grey.800",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom color="lime">
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            label="Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "grey.300" } }}
            sx={{
              bgcolor: "grey.700",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "grey.300" } }}
            sx={{
              bgcolor: "grey.700",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "grey.300" } }}
            sx={{
              bgcolor: "grey.700",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
          <Typography>
            {" "}
            already have an account? <Link to="/login">LogIn</Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "lime",
              color: "black",
              "&:hover": { bgcolor: "limegreen" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Register;
