import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import logo from './header-img.png';
import "./App.css";


function Comics() {
  const [comic, setComic] = useState([]);
  const [comicNum, setComicNum] = useState(400);
  const [alt, setAlt] = useState("");
  const [num, setNum] = useState(1);
  const [img, setImg] = useState("");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1700);
  const [initial, setInitial] = useState(true);
  const [latestComic, setLatestComic] = useState(-1);
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch(e => {
        console.log(e);
      })
      console.log(data);
  }, []);

  const dailyComic = async () => {
    const response = await fetch("https://mycorsproxy-comicapp.herokuapp.com/https://xkcd.com//info.0.json");

    const comic = await response.json();
    setComic(comic);

    const { alt, num, day, img, month, year } = comic;

    setAlt(alt);
    setNum(num);
    setImg(img);
    setDay(day);
    setMonth(month);
    setYear(year);

    if (initial) {
      setLatestComic(num);
      setInitial(false);
    }
  };

  const getComic = async () => {
    const response = await fetch(
      "https://mycorsproxy-comicapp.herokuapp.com/https://xkcd.com/" + comicNum + "/info.0.json"
    );

    const comic = await response.json();
    setComic(comic);

    const { alt, num, day, img, month, year } = comic;

    setAlt(alt);
    setImg(img);
    setNum(num);
    setDay(day);
    setMonth(month);
    setYear(year);
  };

  const previousComic = () => {
    if (comicNum > 1) {
      if (comicNum === 405) {
        setComicNum(comicNum - 2);
      } else {
        setComicNum(comicNum - 1);
      }
    }
  };

  const nextComic = () => {
    if (comicNum < latestComic - 2) {
      if (comicNum === 403) {
        setComicNum(comicNum + 2);
      } else {
        setComicNum(comicNum + 1);
      }
    } else if (comicNum === latestComic - 1) {
      setComicNum(1);
    }
  };

  const randComic = () => {
    let min = Math.ceil(1);
    let max = Math.floor(latestComic);
    let randomComic = Math.floor(Math.random() * (max - min + 1)) + min;
    setComicNum(randomComic);
  };

  const userComic = () => {
    if (userInput < 1 || userInput > latestComic || userInput == 404) {
      alert("This comic does not exist, showing a random one instead.");
      randComic();
    } else {
      setComicNum(parseInt(userInput));
    }
  };

  useEffect(() => {
    if (initial) {
      dailyComic();
    } else {
      getComic(comicNum);
    }
  }, [comicNum]);

  function prevDef(e) {
    e.preventDefault();
  }

  return (
    <>
      <title>Comic your life!</title>
      
      <img src={logo} alt="comic" className="img-header" />
      <div className="container">
        <div className="Buttons">
          <p></p>
          <Button outline color="primary" onClick={previousComic}>
            Previous
          </Button>{" "}
          <Button outline color="secondary" onClick={randComic}>
            Random
          </Button>{" "}
          <Button outline color="primary" onClick={nextComic}>
            Next
          </Button>{" "}
        </div>
        <div className="Input">
          <form onSubmit={prevDef}>
            <label className="custom-field">
              <input
                type="text"
                className="inputField"
                required
                onChange={(e) => setUserInput(e.target.value)}
              ></input>
              <span className="placeholder">comic #num</span>
            </label>
            <Button
              className="inputButton"
              outline
              color="primary"
              onClick={userComic}
            >
              Go
            </Button>
          </form>
        </div>

        <div>
          <h2>
            {year} / {month} / {day}
          </h2>
          <img src={img} alt={alt} />
        </div>

    </div>

    </>
  );
}

export default Comics;
