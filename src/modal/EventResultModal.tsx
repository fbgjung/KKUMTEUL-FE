import Modal from 'react-modal';
import styled from 'styled-components';

interface Winner {
  name: string;
  phoneNumber: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Winner[];
}

const EventModal = ({ isOpen, onClose, winners }: EventModalProps) => {
  const limitedWinners = winners.slice(0, 100);

  const rows: Winner[][] = [];
  for (let i = 0; i < limitedWinners.length; i += 4) {
    rows.push(limitedWinners.slice(i, i + 4));
  }

  const formatPhoneNumber = (phone: string) => {
    return `${phone.slice(0, 3)}******${phone.slice(-2)}`;
  };

  const obfuscateName = (name: string) => {
    if (name.length > 2) {
      return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
    } else if (name.length === 2) {
      return name.charAt(0) + '*' + name.charAt(1);
    }
    return name;
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={customModalStyles}>
      <ModalContent>
        <Image src="/assets/cookie.png" alt="Cookie Image" />
        {winners.length === 0 ? (
          <Text>아직 당첨 결과가 나오지 않았어요.</Text>
        ) : (
          <>
            <Text>당첨자 리스트</Text>
            <WinnersTable>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((winner, index) => (
                      <WinnerCell key={index}>
                        <strong>{obfuscateName(winner.name)}</strong>
                        <span>{formatPhoneNumber(winner.phoneNumber)}</span>
                      </WinnerCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            </WinnersTable>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EventModal;

const ModalContent = styled.div`
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
  margin-bottom: 15px;
`;

const Text = styled.p`
  margin: 0;
  color: #777171;
  font-weight: bold;
  margin-bottom: 10px;
`;

const WinnersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const WinnerCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #555;

  & strong {
    display: block;
    font-weight: 600;
  }

  & span {
    color: #777;
    font-size: 12px;
  }
`;

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
    height: "auto",
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
