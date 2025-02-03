import { useState, useEffect, useRef } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Giả sử bạn có một state lưu trữ tin nhắn
  const chatWindowRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Hàm để tự động cuộn xuống cuối
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // Sử dụng useEffect để cuộn xuống cuối khi cửa sổ chat mở hoặc khi có tin nhắn mới
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  return (
    <html lang="en">
      <body>
        <CopilotKit publicApiKey="ck_pub_afabf2e04b05ff72fd26d0ffb8e5adab">
          {/* Văn bản trên nút chatbot */}
          <div
            style={{
              position: "fixed",
              bottom: "90px", // Vị trí trên nút chat
              left: "20px", // Chuyển sang góc trái
              textAlign: "center",
              fontSize: "20px",
              color: "#003f8c", // Màu xanh nhạt
              fontWeight: "bold",
              zIndex: 1000,
            }}
          >
            Trợ lý AI
          </div>

          {/* Nút mở/đóng cửa sổ chat */}
          <button
            onClick={toggleChat}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px", // Chuyển sang góc trái
              backgroundColor: "#e0f7fa", // Màu xanh nhạt
              color: "#007bff",
              borderRadius: "50%",
              padding: "15px",
              fontSize: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            {isOpen ? "✖" : "🤖"} {/* Thay icon bằng biểu tượng robot */}
          </button>

          {/* Cửa sổ chat */}
          {isOpen && (
            <div
              style={{
                position: "fixed",
                bottom: "70px",
                left: "20px", // Chuyển sang góc trái
                width: "400px",
                maxHeight: "500px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                overflow: "auto", // Thêm overflow để hiển thị thanh cuộn
              }}
              ref={chatWindowRef} // Tham chiếu đến phần tử div này
            >
              <CopilotChat
                labels={{
                  title: "Custom Chat Title",
                  initial: "Bạn muốn mua vợt như thế nào?",
                }}
                instructions="The whole chat experience, zero hassle"
              />
              {/* Giả sử bạn render các tin nhắn ở đây */}
              <div>
                {messages.map((msg, index) => (
                  <div key={index}>{msg}</div>
                ))}
              </div>
            </div>
          )}
        </CopilotKit>
      </body>
    </html>
  );
}
