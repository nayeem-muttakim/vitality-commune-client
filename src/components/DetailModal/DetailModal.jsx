import { AspectRatio, Card, IconButton } from "@mui/joy";
import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DetailModal = ({ open, handleClose, challenge }) => {
  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Card
              variant="outlined"
              sx={(theme) => ({
                width: 300,
                mx: "auto",
                gridColumn: "span 2",
                flexDirection: "row",
                flexWrap: "wrap",
                resize: "horizontal",
                overflow: "hidden",
                gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                transition: "transform 0.3s, border 0.3s",
                "&:hover": {
                  borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                  transform: "translateY(-2px)",
                },
                "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
              })}
            >
              <AspectRatio
                variant="soft"
                sx={{
                  flexGrow: 1,
                  display: "contents",
                  "--AspectRatio-paddingBottom":
                    "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
                }}
              >
                <Image
                  width={300}
                  height={200}
                  src={challenge?.banner}
                  alt=""
                />
              </AspectRatio>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 200,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <div>
                    <Typography level="title-lg">
                      Duration - {challenge?.date_range}
                    </Typography>
                    <Typography level="body-sm">
                      Goals : {challenge?.goals_milestone}
                    </Typography>
                  </div>
                </Box>
                <AspectRatio
                  variant="soft"
                  sx={{
                    "--AspectRatio-paddingBottom":
                      "clamp(0px, (100% - 200px) * 999, 200px)",
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    width={300}
                    height={200}
                    alt=""
                    src={challenge?.banner}
                  />
                </AspectRatio>
                <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                  <div>
                    <Typography level="title-lg">Hosted by :-</Typography>
                    <Typography level="body-sm">{challenge?.host}</Typography>
                  </div>
                </Box>
              </Box>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default DetailModal;
