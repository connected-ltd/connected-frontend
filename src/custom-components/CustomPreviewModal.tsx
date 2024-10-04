// import { Close } from "@mui/icons-material";
// import { Box, Modal, Typography, IconButton } from "@mui/material";
// import previewNoteIcon from "../assets/icons/preview-note-icon.svg";
// import { Note } from "../types/note.types";

// type NoteModalsProps = {
//   openModal: boolean;
//   handleCloseModal: () => void;
//   note: Note;
// };

// const CustomPreviewModal = ({
//   openModal,
//   handleCloseModal,
//   note,
// }: NoteModalsProps) => {
//   return (
//     <Box>
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "#fff",
//             padding: "2.5em",
//             borderRadius: "24px",
//             width: { xs: "90%", sm: "70%", md: "55vw" },
//             maxWidth: { xs: "75vw", md: "55vw" },
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{ color: "#2F2F2F", fontWeight: 700, fontSize: "2em" }}
//             >
//               Preview Note
//             </Typography>
//             <IconButton onClick={handleCloseModal}>
//               <Close sx={{ fontSize: "2rem", color: "#6F6F67" }} />
//             </IconButton>
//           </Box>
//           <Box sx={{ display: "flex", gap: 1, marginTop: ".5em" }}>
//             <Box>
//               <img src={previewNoteIcon} style={{ width: "100%" }} />
//             </Box>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: "#9F9F9F",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 textTransform: "capitalize",
//               }}
//             >
//               {note.subject}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: "#9F9F9F",
//                 fontWeight: 400,
//                 fontSize: "1rem",
//                 textTransform: "capitalize",
//               }}
//             >
//               {note.topic}
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               backgroundColor: "#F9F9F9",
//               borderRadius: "21px",
//               marginTop: "1em",
//               flex: 1,
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: "column",
//               maxHeight: "65vh",
//             }}
//           >
//             <Box
//               sx={{
//                 padding: "1.5em",
//                 overflowY: "auto",
//                 flex: 1,
//               }}
//             >
//               {note.body}
//             </Box>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default CustomPreviewModal;
