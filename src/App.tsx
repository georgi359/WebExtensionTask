import reactLogo from "./assets/react.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { ImageContainerComp } from "./componnents/ImageContainerComp";

function App() {
  const githubUrl = "https://github.com/georgi359/WebExtensionTask";

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="75" height="80" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
        </div>
        <div>
          <h1>Chrome Extension Assignment</h1>
        </div>

        <ImageContainerComp />
      </section>

      <section id="next-steps">
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Project GitHub</h2>
          <ul>
            <li>
              <a href={githubUrl} target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
