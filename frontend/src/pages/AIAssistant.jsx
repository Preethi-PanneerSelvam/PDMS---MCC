import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { sendAIMessage } from "../services/aiService";

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendAIMessage(input);
      const aiMessage = { role: "ai", text: response.answer };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error contacting AI service." },
      ]);
    }

    setLoading(false);
  };

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Gen AI Assistant
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "60vh",
          overflowY: "auto",
          mb: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            mb={2}
            textAlign={msg.role === "user" ? "right" : "left"}
          >
            <Typography
              sx={{
                display: "inline-block",
                p: 1.5,
                borderRadius: 2,
                bgcolor:
                  msg.role === "user" ? "#1976d2" : "#f1f1f1",
                color:
                  msg.role === "user" ? "#fff" : "#000",
                maxWidth: "75%",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}

        {loading && <CircularProgress size={24} />}
      </Paper>

      <Box display="flex">
        <TextField
          fullWidth
          placeholder="Ask something about the plant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AIAssistant;
