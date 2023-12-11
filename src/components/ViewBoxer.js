import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ViewBoxer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentBoxer,
  selectToEditInfo,
  toggleEditInfoBar,
} from "../features/selectBoxerSlice";
import { Button } from "react-bootstrap";
import InputBar from "./InputBar";
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import AddIcon from '@mui/icons-material/Add';

function ViewBoxer(props) {
  const currentBoxerInfo = useSelector(selectCurrentBoxer);
  const showEditInfo = useSelector(selectToEditInfo);
  const dispatch = useDispatch();
  const [infoArray, setInfoArray] = useState([]);
  const [fullInfo, setFullInfo] = useState("");
  // const [infoSubmitted, setInfoSubmitted] = useState(false);
  const [viewBoxerInfo, setViewBoxerInfo] = useState(false);
  const [viewBoxerFights, setViewBoxerFights] = useState(true);
  const [fightsArray, setFightsArray] = useState([])

  //=================================================
  // Code needed to get picture into ViewBoxer
  // Don't know why it is what it is but it worked and nothing else did
  if (currentBoxerInfo.imageName !== "") {
    var imgURL = require(`../images/${currentBoxerInfo.backgroundImageName}`);
  } else {
    var imgURL = require(`../images/default.jpg`);
  }
  //=================================================

  useEffect(() => {
    async function handleInfoSubmit(id) {
      // Send GET request to get current infomation
      const response = await fetch(`http://localhost:5000/getInfo/${id}`)
      const record = await response.json();
      setFightsArray(record['fights'])
      console.log(record);
    }
    handleInfoSubmit(currentBoxerInfo._id);
    // setInfoSubmitted(false);
  }, [currentBoxerInfo]);

  // const newAdded = () => {
  //   setInfoSubmitted(true);
  // }

  const handleViewFightsClick = () => {
    setViewBoxerFights(true);
    setViewBoxerInfo(false);
  }

  // const handleViewInfoClick = () => {
  //   setViewBoxerInfo(true);
  //   setViewBoxerFights(false);
  // }


  const handleWatchedClick = () => {
    // set watch to true in database 
  }

  const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
      <iframe
        width="180"
        height="100"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <div className="viewBoxer__container">
      <Modal {...props} size="lg" centered>
        <div className="viewBoxer__Header" style={{ backgroundImage: "url(" + imgURL + ")" }}>
          <Modal.Header className="viewBoxer__ModalHeader">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="viewBoxer__titleName">
                <h1>{currentBoxerInfo.name}</h1>
              </div>
            </Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="viewBoxer__modalBody">
            <div className="viewBoxer__data">
              <div className="viewBoxer__dataLeft">
                <h4>{`${currentBoxerInfo.debut}-${currentBoxerInfo.retire}`}</h4>
              </div>
              <div className="viewBoxer__dataRight">
                <h4>{`${currentBoxerInfo.wins}-${currentBoxerInfo.losses}-${currentBoxerInfo.draws}`}</h4>
              </div>
            </div>
            <hr />
            {/* {viewBoxerInfo &&
              <div className="viewBoxer__info">
                <ul>
                  {infoArray.map((item, index) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
            } */}
            <div className="viewBoxer__info">
              <div className="fight_video_container">
                {fightsArray.map((fight, index) => {
                  var watched = fight.watched
                  return (
                    <>
                    <div className="fight_video_single_row">
                      <div className="fight_number">{fight.fightNumber}.</div>
                      <div className="fight_youtube_thumbnail_container">
                        <div className="fight_youtube_thumbnail">
                          <YoutubeEmbed embedId={fight.youtubeID} />
                        </div>
                      </div>
                      <div className="fight_info">
                        <div className="fight_opponent">vs. {fight.opponent}</div>
                        <div className="fight_date">{fight.date}</div>
                      </div>
                      <div className="fight_watched">
                        <Form.Check
                          className="fight_watched_checkbox"
                          type={'checkbox'}
                          id={'default-checkbox'}
                          checked={watched}
                          onClick={watched = !watched}
                        />
                      </div>
                    </div>
                    <hr />
                    </>
                    
                  )
                })
                }
              </div>
            </div>
          </div>
          {/* {showEditInfo && (
            <InputBar
              currentInfo={currentBoxerInfo.info}
              id={currentBoxerInfo._id}
              newAdded={newAdded}
            />
          )} */}
        </Modal.Body>
        <Modal.Footer>
          <div className="viewBoxer__footer">
            <div className="viewBoxer__footer_leftside">
              {/* {viewBoxerInfo &&
                <Button className="col-sm-5" onClick={() => dispatch(toggleEditInfoBar())} variant="danger">
                  Update Info
                </Button>
              }
              {viewBoxerFights &&
                <Button className="col-sm-5" onClick={() => handleViewInfoClick()} variant="danger">
                  View Info
                </Button>
              } */}
              <Button className="col-sm-5 watch_fight_button" onClick={() => handleViewFightsClick()} variant="danger">
                <AddIcon /> Add Fight
              </Button>
            </div>

            <Button className="col-sm-2" onClick={props.onHide} variant="danger">
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewBoxer;
