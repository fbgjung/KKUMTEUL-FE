import Modal from 'react-modal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={customModalStyles}>
      <ModalContent>
        <h3>로그인이 필요해요</h3>
        <Text>로그인하고 꿈틀 서비스를 즐겨보세요!</Text>
        <LoginButton onClick={() => { 
          navigate('/login')
          onClose(); 
        }}>
          로그인하기
        </LoginButton>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

const ModalContent = styled.div`
  width: 300px;
  padding: 20px;
  text-align: center;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LoginButton = styled.button`
  margin: 20px;
  padding: 10px 40px;
  width: 400px;
  height: 50px;
  font-size: 16px;
  background: #ace601;
  color: white;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #40ca28;
  }
`;

const Text = styled.p`
  margin: 0;
  color: #777171;
`

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "500px",
    height: "200px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
};
