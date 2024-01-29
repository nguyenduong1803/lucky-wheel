import { useRef, useState } from "react";
import "./App.css";
import { Wheel } from "react-custom-roulette";
import { Box, Button, Typography, Stack, Divider } from "@mui/material";
import rotate from "./assets/audio/rotate.mp3";
import claping from "./assets/audio/claping.mp3";
import { data } from "./data";

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const remainingData = useRef(data);
  const refRotate = useRef(null);
  const refClaping = useRef(null);

  const handleClose = () => {
    refClaping.current.currentTime = 0;
    refClaping.current.pause();
    setOpen(false);
  };

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const randomElement =
        remainingData.current[
          Math.floor(Math.random() * remainingData.current.length)
        ];

      const newList = remainingData.current.filter(
        (item) => item.option !== randomElement.option
      );

      const index = data.findIndex(
        (item) => item.option === randomElement.option
      );

      remainingData.current = newList;

      setPrizeNumber(index);
      setMustSpin(true);

      await new Promise(() => {
        setTimeout(() => {
          refRotate.current.play();
        }, 1500);
      });
    }
  };

  const styleOpen = {
    transform: "translate(-50%,-50%) scale(1)",
    visible: "visible",
  };
  const styleClose = {
    transform: "translate(-50%,-50%) scale(0)",
    visible: "hidden",
  };

  const computeStyle = open ? styleOpen : styleClose;

  return (
    <>
      <div className="app">
        <div className="wrapper-weel">
          <Wheel
            outerBorderColor="#fff"
            innerBorderWidth={8}
            spinDuration={0.8}
            innerBorderColor="#fff"
            outerBorderWidth={8}
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
              setOpen(true);
              refRotate.current.pause();
              refRotate.current.currentTime = 0;
              refClaping.current.play();
            }}
            radiusLineColor="#fff"
            radiusLineWidth={1}
            textColors={["#ffffff"]}
          />
          <Button
            sx={{ marginTop: "20px" }}
            color="error"
            size="large"
            onClick={handleSpinClick}
            variant="contained"
          >
            Quay số
          </Button>
        </div>
      </div>
      <Box
        sx={{
          transition: "0.6s ease",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          visibility: open ? "visible" : "hidden",
          opacity: open ? 2 : 0,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          position: "fixed",
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            transition: "0.4s ease",
            top: "50%",
            left: "50%",
            backgroundColor: "background.paper",
            borderRadius: "6px",
            boxShadow: 24,
            p: 2,
            width: 1200,
            ...computeStyle,
          }}
        >
          <Typography color="error" variant="h2">
            Câu hỏi dành cho bạn:
          </Typography>
          <Divider sx={{my:2}}/>
          <Typography fontSize={40}> {data[prizeNumber].question}</Typography>
          <Stack alignItems="end">
            <Button onClick={handleClose}>Đóng</Button>
          </Stack>
        </Box>
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </Box>
      <Box sx={{ visibility: "hidden", opacity: 0 }}>
        <audio ref={refRotate} src={rotate} type="audio/ogg" />
        <audio ref={refClaping} src={claping} type="audio/ogg" />
      </Box>
    </>
  );
}

export default App;
