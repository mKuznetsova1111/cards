import React, {useState, useRef, useEffect} from "react";
import CustomButton from "../customButton/CustomButton";
import CustomProgress from "../customProgress/CustomProgress";


const Player = React.forwardRef(
  function Player({play, isActive, video, audio, openModal, type}, ref) {
    const [isPlay, setIsPlay] = useState(false);
    const [volume, setVolume] = useState(0);

    const audioRef = useRef();

    const timeRef = useRef();
    const videoRef = useRef();
    const lineRef = useRef();

    useEffect(() => {
      if (play) {
        setTimeout(() => {
          setIsPlay(play);
        }, 200);
      } else {
        setIsPlay(play);
      }
    }, [play]);

    useEffect(() => {
      if (!isActive) setIsPlay(false);
    }, [isActive]);

    useEffect(() => {
      const target = videoRef.current || audioRef.current;

      if (!target) return;

      target.volume = volume;
    }, [volume]);

    useEffect(() => {
      const target = videoRef.current || audioRef.current;

      if (!target) return;

      if (isPlay) target.play();
      else target.pause();

    }, [isPlay]);

    useEffect(() => {
      let isUnmounted;

      const target = videoRef.current || audioRef.current;

      if (!target) return;

      requestAnimationFrame(update);

      return () => {
        isUnmounted = true;
      };

      function update() {
        if (isUnmounted) return;


        const {currentTime, duration} = target;

        const cDate = new Date(currentTime * 1000);
        const dDate = new Date(duration * 1000);


        if (lineRef.current)
          lineRef.current.style.width = `${currentTime / duration * 100}%`;

        if (timeRef.current)
          timeRef.current.innerHTML = `${String(cDate.getMinutes()).padStart(2, "0")}:${String(cDate.getSeconds()).padStart(2, "0")}/${String(dDate.getMinutes()).padStart(2, "0")}:${String(dDate.getSeconds()).padStart(2, "0")}`;

        requestAnimationFrame(update);
      }
    }, []);

    useEffect(() => {
      if (audio) {
        if (isPlay) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    }, [isPlay]);

    useEffect(() => {
      if (audio) {
        audioRef.current.addEventListener("ended", () => {
          setIsPlay(false);
        });
      }
    }, []);

    return (
      <div className={`player ${audio ? "player_audio" : ""}`} ref={ref}>
        {video && <div className={"player__content"}>
          <video key={video} ref={videoRef} preload={"metadata"} src={`${video}`}
                 playsInline={true} onEnded={() => setIsPlay(false)}
          />
        </div> }
        {audio && <audio src={audio} style={{display: "none"}} ref={audioRef}/>}
        <div className={"player__controls"}>
          <div className={"player__line"}>
            <div ref={lineRef} className={"player__line-block"}/>
            <CustomProgress progressChanged={(progress) => {
              const target = videoRef.current || audioRef.current;
              if (!target) return;
              target.currentTime = target.duration * progress;
            }} isVertical={false} overrideClasses={{element: "custom-progress"}}/>
          </div>
          <div className={"player__buttons"}>
            <div className={"player__buttons-block"}>
              <CustomButton
                className={"custom-button_player player__button player__play"}
                isIcon={"true"}
                img={isPlay ? "player/pause.svg" : "player/play.svg"}
                onClick={() => setIsPlay(!isPlay)}
              />
              <CustomButton
                className={"custom-button_player player__button player__stop"}
                isIcon={"true"}
                img={"player/stop.svg"}
                onClick={() => {
                  const target = videoRef.current || audioRef.current;
                  target.currentTime = 0;
                  setIsPlay(false);
                }}
              />
              <CustomButton
                className={"custom-button_player player__button player__sound"}
                isIcon={"true"}
                img={volume > 0 ? "player/soundOn.svg" : "player/soundOff.svg"}
                onClick={() => setVolume(!volume)}
              />
              <div className={"player__sound-line"}>
                <div className={"player__sound-line-block"} style={{width: `${volume * 100}%`}}>
                  <div className={"player__sound-line-circle"}/>
                </div>
                <CustomProgress 
                  progressChanged={(progress) => {setVolume(progress)}} 
                  isVertical={false} 
                  overrideClasses={{element: "custom-progress"}}
                />
              </div>
              <div ref={timeRef} className={"player__time"}>{"00:00/00:00"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });
export default Player;
Player.propTypes = {};

