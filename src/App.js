import { useRef, useState } from "react";
import "./App.css";
import { Wheel } from "react-custom-roulette";
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import rotate from "./assets/audio/rotate.mp3";
import claping from "./assets/audio/claping.mp3";
import { data } from "./data";
import Menu from "./Menu";
import SettingIcon from "./assets/audio/icons/setting";

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [code, setCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [remainingData, setRemainingData] = useState(() => {
    const remainDataStore = localStorage.getItem("iist_remainData");
    const dataStore = JSON.parse(remainDataStore);
    if (dataStore && dataStore.length) {
      return dataStore;
    }
    return data;
  });
  const refRotate = useRef(null);
  const refClaping = useRef(null);

  const handleClose = () => {
    refClaping.current.currentTime = 0;
    refClaping.current.pause();
    setOpen(false);
  };

  const handleSpinClick = async () => {
    if (!mustSpin && remainingData.length > 0) {
      const randomElement =
        remainingData[Math.floor(Math.random() * remainingData.length)];

      const newList = remainingData.filter(
        (item) => item.option !== randomElement.option
      );

      const index = data.findIndex(
        (item) => item.option === randomElement.option
      );

      setRemainingData(newList);
      localStorage.setItem("iist_remainData", JSON.stringify(newList));
      setPrizeNumber(index);
      setMustSpin(true);

      await new Promise(() => {
        setTimeout(() => {
          refRotate.current.play();
        }, 1500);
      });
    } else {
    }
  };

  const handleSubmitCode = () => {
    if (code === "iist2024") {
      setIsSuccess(true);
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
        {isSuccess && (
          <Menu
            remainingData={remainingData}
            setPrizeNumber={setPrizeNumber}
            setOpenModal={setOpen}
            setRemainingData={setRemainingData}
          />
        )}
        <Box
          sx={{
            position: "fixed",
            left: "30px",
            top: "30px",
          }}
        >
          <img src="https://iist.com.vn/wp-content/uploads/2018/09/Logo-IIST-e1537931075520.png" />
        </Box>
        {!isSuccess && (
          <Box
            onSubmit={handleSubmitCode}
            component="form"
            sx={{
              marginTop: "-400px",
              backgroundColor: "#fff",
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              borderRadius: "6px",
            }}
          >
            <TextField
              onChange={(e) => setCode(e.target.value)}
              size="large"
              label="Code"
              type="password"
            />
            <Button
              type="submit"
              color="error"
              variant="contained"
              size="large"
            >
              Nhập code
            </Button>
          </Box>
        )}
        {isSuccess && (
          <Box position="relative" className="wrapper-weel">
            <Wheel
              fontSize={14}
              fontWeight={400}
              outerBorderColor="#fff"
              innerBorderWidth={8}
              spinDuration={0.8}
              innerBorderColor="#fff"
              outerBorderWidth={3}
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: 400,
                transform: "translate(-50%,-50%)",
              }}
            >
              <Button
                color="inherit"
                size="large"
                onClick={handleSpinClick}
                variant="contained"
                sx={{
                  fontWeight: 600,
                  fontSize: 28,
                  height: "150px",
                  width: "150px",
                  borderRadius: "50%",
                }}
              >
                <SettingIcon className="rotating" />
              </Button>
            </Box>
          </Box>
        )}
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
          <Typography color="error" fontSize={40}>
            Câu hỏi dành cho bạn:
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography fontSize={40} p={5}>
            {data[prizeNumber].question}
          </Typography>
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
