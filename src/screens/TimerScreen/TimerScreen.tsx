import React, { useState } from 'react';


import Text from '@src/components/Text';
import View from '@src/components/View';
import Button from '@src/components/Button';


const TimerScreen = ({ isTherapist, submitSessionEnded }) => {
  const [secondsCounter, setSecondsCounter] = useState(0);

  const [isTimeStarted, setIsTimeStarted] = useState(false);
  const [pause, setPause] = useState(false);
  const [timer, setTimer] = useState(null);

  const minutes = Math.floor(secondsCounter / 60);
  const seconds = secondsCounter - minutes * 60;

  const minutesFormated = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  const secondsFormated = seconds.toString().length === 1 ? `0${seconds}` : seconds;


  const handleStartTimer = () => {
    setIsTimeStarted(true);
    const interval = setInterval(() => {
      setSecondsCounter((counter) => counter + 1);
    }, 1000);
    setTimer(interval);
  };

  const handlePauseTimer = () => {
    if (pause) {
      setPause(false);
      handleStartTimer();
    } else {
      clearInterval(timer);
      setPause(true);
    }
  };

  const handleEndTimer = () => {
    clearInterval(timer);
    setSecondsCounter(0);
    submitSessionEnded();
  };

  return (
    <View alignCenter>
      <View
        row
        variant="borderBottom"
        alignCenter
        bgColor={isTimeStarted ? 'secondary' : 'white'}
        spacing={{ p: 4 }}
      >
        <View flex={1} alignCenter>
          <Text
            variant={isTimeStarted ? 'titleWhite' : 'titleSecondaryLight'}
            typography={{ size: 2 }}
          >
            original time
          </Text>
          <View row>
            <Text
              variant={isTimeStarted ? 'boldWhite' : 'lightGreySmallest'}
              typography={{ size: 8 }}
            >
              {`${minutesFormated}:`}
            </Text>
            <View>
              <Text
                variant={isTimeStarted ? 'boldWhite' : 'lightGreySmallest'}
                typography={{ size: 8 }}
                spacing={{ ml: 2 }}
              >
                {secondsFormated}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View spacing={{ mt: 6, mx: 3 }} alignCenter>
        {isTherapist
          ? (
            <View row>
              <View flex={1}>
                {isTimeStarted
                  ? (
                    <View row>
                      <View flex={1} height={60} spacing={{ mx: 4 }}>
                        <Button variant="secondaryBig" onPress={handlePauseTimer}>
                          {pause ? 'Start' : 'Pause'}
                        </Button>
                      </View>
                      <View flex={1} height={60} spacing={{ mx: 4 }}>
                        <Button onPress={handleEndTimer}>End</Button>
                      </View>
                    </View>
                  )
                  : (
                    <Button onPress={handleStartTimer}>
                      Start
                    </Button>
                  )}
              </View>
            </View>
          )
          : <Text variant="titleSmall">appointment Time</Text>}
      </View>
    </View>
  );
};

export default TimerScreen;
