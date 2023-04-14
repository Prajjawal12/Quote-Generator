import React from 'react';
import axios from 'axios';
import audio from '../assets/kidding_around.mp3';
import { Howl, Howler } from 'howler';
import bgVideo from '../assets/abstract_futuristic_loops.mp4';
import '../css/index.css';
const audioClip = [{ sound: audio, label: '🎧' }];
class Main extends React.Component {
  SoundPlay = (src) => {
    const sound = new Howl({
      src,

      onend: function () {
        this.play();
      },
    });
    sound.play();
  };

  RenderButtonAndSound = () => {
    return audioClip.map((soundObj, index) => {
      return (
        <button key={index} onClick={() => this.SoundPlay(soundObj.sound)}>
          {soundObj.label}
        </button>
      );
    });
  };

  state = {
    advice: '',
  };
  componentDidMount() {
    this.fetchAdvice();
  }
  fetchAdvice = () => {
    axios
      .get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    Howler.volume(1.0);
    const { advice } = this.state;
    return (
      <>
        <div className="main" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <video
              src={bgVideo}
              loop
              autoPlay
              muted
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></video>
            <div
              className="app"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="card">
                <h1 className="heading"> {advice}</h1>
                <button className="button" onClick={this.fetchAdvice}>
                  Click Me!!
                </button>
              </div>
              <div>{this.RenderButtonAndSound()}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
