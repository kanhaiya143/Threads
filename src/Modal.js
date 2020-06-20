import React, { useState } from "react";
import "./Modal.css";
import View from "./View";
import axios from "axios";

import {
  Dropdown,
  Popup,
  Button,
  Form,
  Divider,
  Grid,
  Segment,
  Header,
  Modal,
  Icon,
  Message,
} from "semantic-ui-react";
import GridList from "@material-ui/core/GridList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableList from "react-draggable-lists";
import DragDrop from "./DragAndDrop";
import { TextareaAutosize } from "@material-ui/core";

const style = {
  content: {
    border: "0",
    left: "40%",
    top: "20%",

    width: "30%",
    height: "30%",
  },
};
const style1 = {
  content: {
    height: "auto",
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
  },
};
const exercise = [
  {
    key: "Pushup",
    text: "Pushup",
    value: "Pushup",
    ExerciseName: "Pushup",
    src: "https://tread.imfast.io/aman/pushup.mp4",
  },
  {
    key: "Plank",
    text: "Plank",
    value: "Plank",
    ExerciseName: "Plank",
    src: "https://tread.imfast.io/aman/plank.mp4",
  },
  {
    key: "Lunges",
    text: "Lunges",
    value: "Lunges",
    ExerciseName: "Lunges",
    src: "https://tread.imfast.io/aman/lunges.mp4",
  },
  {
    key: "Squats",
    text: "Squats",
    value: "Squats",
    ExerciseName: "Squats",
    src: "https://tread.imfast.io/aman/bodyweight_squats.mp4",
  },
  {
    key: "Jumping Jacks",
    text: "Jumping Jacks",
    value: "Jumping Jacks",
    ExerciseName: "Jumping Jacks",
    src: "https://media.giphy.com/media/2tKBrBj4pQJlzWTa81/giphy.mp4",
  },
];

const Modalcall = (props) => {
  // const [copyItems, setCopy] = useState([1, 2, 3]);
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [rest, setRest] = useState("");
  const [excerciseName, setName] = useState("");
  const [Items, addList] = useState([]);
  const [video, setVideo] = useState("");
  const [modalIsOpen, setModalIsopen] = useState(false);
  const [modalIsOpen2, setModalIsopen2] = useState(false);
  const [modalIsOpen3, setModalIsopen3] = useState(false);
  const [youtubelink, setLink] = useState("");
  const [noUpdate, setUpdate] = useState(false);
  const [ID, passingId] = useState();
  const [wrongurl, setErrorUrlMessage] = useState("");
  const [uploadedFile, setUploadFile] = useState("");
  const [response, setResponse] = useState("");

  // All items submit to db modal
  const BuildWorkout = () => {
    const [email, setEmail] = useState("");
    const SendToMail = async () => {
      setModalIsopen3(false);

      
      const items =Items;
      const mail = email;
      const timerName = "HIIT Test";

      // console.log(items);
      // posting request here to server
      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////
      await axios
        .post("/submit", { items, mail, timerName })
        .then((res) => {
          setResponse(res.data.msg);
          console.log(res.data);
        })
        .catch((err) => {
          setResponse(err.response.data.msg);
        });
    };

    return (
      <div>
        <Modal
          closeIcon
          size="tiny"
          open={modalIsOpen3}
          onClose={(e) => setModalIsopen3(false)}
          closeOnDimmerClick={true}
        >
          <Form>
            <Grid style={{ textAlign: "center", margin: 50 }}>
              <Grid.Row>
                <Grid.Column>
                  <Message
                    header="Your workout has been built."
                    content="Please enter your mail ID and we will mail you the link."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field
                    label="Enter Your Email ID"
                    control="input"
                    id="form-input-control-error-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joe@schmoe.com"
                    // error={{
                    //   content: "Please enter a valid email address",
                    //   pointing: "below",
                    // }}
                  ></Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Button onClick={SendToMail}>Submit</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal>
      </div>
    );
  };

  const openModal = () => {
    setModalIsopen(true);
    setUpdate(true);
    setReps("");
    setTime("");
    setRest("");
    setName("");
    setVideo("");
  };

  const twomethod = () => {
    setModalIsopen(true);
    setUpdate(true);
    setReps("");
    setTime("");
    setRest("");
    setName("");
    setVideo("");
    setLink("");

    // setCopy([1]);
  };

  const callEdit = (id) => {
    setReps(Items[id].reps);
    setTime(Items[id].time);
    setRest(Items[id].rest);
    setName(Items[id].excerciseName);
    setVideo(Items[id].video);

    setModalIsopen(true);
    setUpdate(false);
    passingId(id);
  };

  // const callCopy = (id) => {
  //   console.log(Items[id]);
  //   Items.splice(id + 1, 0, Items[id]);
  //   addList([...Items]);

  // };

  const listOfItems = async () => {
    setModalIsopen(false);

    // const items={
    //   excerciseName:name,
    //   reps:reps,
    //   time:time,
    //   rest:rest,
    //   excerciseGIF:video
    // }

    // const mail="kanhaiya@123gmail.com";
    // const timerName="HIIT Test";
    // // posting request here to server
    // await axios
    //   .post("/submit", { items,mail,timerName })
    //   .then((res) => {
    //     setResponse(res.data.msg)
    //     console.log(res.data)
    //   })
    //   .catch((err)=> {

    //  setResponse(err.response.data.msg)
    //  }) ;

    if (noUpdate === true) {
      addList((oldItems) => {
        return [...oldItems, { reps, time, rest, excerciseName, video }];
      });

      // setReps("");
      // setTime("");
      // setRest("");
      // setName("");
      // setVideo("");
      // setLink("");
    } else {
      Items.splice(ID, 1, { reps, time, rest, excerciseName, video });
      addList([...Items]);
      setReps("");
      setTime("");
      setRest("");
      setName("");
      setLink("");
      setVideo("");
      setUpdate(true);
    }
  };

  const handle = (e, data) => {
    setName(data.value);
    console.log(data.value);

    for (var i = 0; i < 5; i++) {
      if (exercise[i].key === data.value) {
        setVideo(exercise[i].src);
        console.log(exercise[i].src);
      }
    }
  };

  const deleteItem = (id) => {
    addList((oldItems) => {
      return oldItems.filter((element, index) => {
        return index !== id;
      });
    });
  };
  const addLink = (e) => {
    if (matchYoutubeUrl(video) === false) {
      setErrorUrlMessage("Invalid Youtube Url Link");
    } else {
      setVideo(video);
      setModalIsopen2(false);
    }
  };

  const closeModal = () => {
    setModalIsopen(false);
  };

  const closeSecondModal = () => {
    setModalIsopen2(false);
  };

  // const getFile = (e) => {
  //   document.getElementById("file").click();
  // };

  function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  var added;
  if (Items.length === 0) added = null;
  else {
    added = (
      <div style={{ textAlign: "center", marginTop: "10%" }}>
        <Button primary onClick={(e) => setModalIsopen3(true)}>
          Build the workout
        </Button>
        <BuildWorkout />
      </div>
    );
  }
  return (
    <div>
      {/* <Popup
        trigger={<Button icon="add" size="massive" onClick={twomethod} />}
        basic
      /> */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsopen(false)}
        style={style1}
      > */}
      {/* <Button onClick={twomethod}>Show Modal</Button> */}
      <Modal
        closeIcon
        size="small"
        open={modalIsOpen}
        onClose={closeModal}
        closeOnDimmerClick={true}
      >
        <Form>
          <br />

          <Header size="huge" textAlign="center">
            <Header.Content>Add your workout</Header.Content>
          </Header>

          <Grid columns="equal" centered>
            <Grid.Row>
              <Grid.Column style={{ marginLeft: 40 }}>
                <Dropdown
                  placeholder="Select"
                  fluid
                  search
                  selection
                  options={exercise}
                  value={excerciseName}
                  onChange={handle}
                />
              </Grid.Column>
              <Grid.Column style={{ marginRight: 40 }}>
                <Button onClick={(e) => setModalIsopen2(true)} fluid>
                  Add your own video link
                </Button>

                <Modal
                  closeIcon
                  onClose={closeSecondModal}
                  open={modalIsOpen2}
                  size="tiny"
                  closeOnDimmerClick={true}
                >
                  <Form style={{ margin: 30 }}>
                    <Grid columns="equal">
                      <Grid.Row>
                        <Grid.Column>
                          <Header textAlign="center">Push</Header>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Input
                            label="Video link from Youtube or Vimeo"
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
                            fluid
                          />
                          <Header.Content>{wrongurl}</Header.Content>
                        </Grid.Column>
                      </Grid.Row>
                      {/* <Grid.Row>
                        <Grid.Column width={1}>
                          <Header>Or</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Button icon labelPosition="left" onClick={getFile}>
                            <Icon name="file" />
                            Choose File
                          </Button>
                          <input
                            type="file"
                            id="file"
                            name="filename"
                            onChange={(e) => setUploadFile(e.target.files)}
                            style={{ display: "none" }}
                            multiple
                          />
                          {uploadedFile}
                        </Grid.Column>
                      </Grid.Row> */}

                      <Grid.Row></Grid.Row>
                      <Grid.Row>
                        <Grid.Column style={{ textAlign: "center" }}>
                          <Button primary onClick={addLink}>
                            Save to Library
                          </Button>

                          <Button
                            onClick={(e) => {
                              setModalIsopen2(false);
                              setLink("");
                              setErrorUrlMessage("");
                            }}
                          >
                            Cancel
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Modal>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              {/* <Button
                icon="video play"
                type="submit"
                onClick={() => setModalIsopen2(true)}
              ></Button>

              <Modal
                isOpen={modalIsOpen2}
                onRequestClose={() => setModalIsopen2(false)}
                style={style}
              > */}
              <Grid.Column textAlign="center">
                <iframe
                  src={video}
                  frameborder="0"
                  allowfullscreen
                  title="video"
                />
              </Grid.Column>

              {/* </Modal> */}
            </Grid.Row>
            <Grid.Row>
              {/* <Form className="form"> */}
              <Grid.Column style={{ marginLeft: 40, marginRight: 40 }}>
                <Form.Group widths="equal">
                  <Form.Field
                    label="Reps"
                    control="input"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                  <Form.Field
                    label="Time (s)"
                    control="input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <Form.Field
                    label="Rest (s)"
                    control="input"
                    value={rest}
                    onChange={(e) => setRest(e.target.value)}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Button type="submit" onClick={listOfItems}>
                Save
              </Button>
            </Grid.Row>
            <Divider hidden />
            {/* </Form> */}
          </Grid>
        </Form>
      </Modal>

      <ol>
        <GridList spacing={15} cellHeight={400} cols="md">
          {Items.map((item, index) => {
            return (
              <div className="view">
                <View
                  key={index}
                  id={index}
                  data={item}
                  onSelect={deleteItem}
                  onEdit={callEdit}
                  video={item.video}
                  // onCopy={callCopy}
                />
              </div>
            );
          })}
          <Button
            onClick={twomethod}
            icon="add"
            style={{ width: 150, height: 150, marginLeft: 80, marginTop: 150 }}
          ></Button>
        </GridList>

        {/* <DraggableList  width={350} height={350} rowSize={4}> 
           
         
         {copyItems.map((item, index) => {
            
            return(
              <div className="view">
                <View
                  key={index}
                  id={index}
                  data={item}
                  onSelect={deleteItem}
                  onEdit={callEdit}
                  onCopy={callCopy}
                />
              </div>);
           
          })} 
          
        </DraggableList>  */}
      </ol>

      {added}
    </div>
  );
};
export default Modalcall;
