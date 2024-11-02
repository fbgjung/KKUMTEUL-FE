import Modal from 'react-modal';
import styled from 'styled-components';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const EventModal = ({ isOpen, onClose, message }: EventModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={customModalStyles}>
      <ModalContent>
        <Image src="/assets/cookie.png"></Image>
        <Text>{message}</Text>        
      </ModalContent>
    </Modal>
  );
};

export default EventModal;

const ModalContent = styled.div`
  /* width: 300px; */
  padding: 20px;
  text-align: center;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 25px;
`

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
