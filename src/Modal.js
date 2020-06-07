import Modal from "react-modal";

import React, { useState } from "react";
import "./Modal.css";
import View from "./View";

import { Dropdown, Popup, Button, Form, Divider } from "semantic-ui-react";
import GridList from "@material-ui/core/GridList";
import DraggableList from "react-draggable-lists";

Modal.setAppElement("#root");
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
    width: "50%",
    height: "50%",
    left: "25%",
    top: "10%",
  },
};

const Modalcall = (props) => {
  const [modalIsOpen, setModalIsopen] = useState(false);
  const [modalIsOpen2, setModalIsopen2] = useState(false);
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [rest, setRest] = useState("");
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  
  const [noUpdate, setUpdate] = useState(false);
  const [ID, passingId] = useState();

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
  const [Items, addList] = useState([]);
  const openModal = () => {
    setModalIsopen(true);
    setUpdate(true);
    setReps("");
    setTime("");
    setRest("");
    setName("");
  };

  const twomethod = () => {
    openModal();
    setUpdate(true);
  };

  const callEdit = (id) => {
    setModalIsopen(true);

    //console.log(Items[id]);
    setUpdate(false);
    passingId(id);
    // addList((oldItems) => {

    //  // oldItems.splice(id,1);
    //   return [...oldItems, { reps, time, rest, name }];

    // });
  };

  const callCopy = (id) => {
    console.log(Items[id]);
    Items.splice(id + 1, 0, Items[id]);
    addList([...Items]);
    // addList((oldItems) => {
    //    oldItems.splice(id+1,0,Items[id]);

    //    return [...oldItems];
    //    //return [...oldItems, oldItems[id]];
    // });
  };

  const listOfItems = () => {
    setModalIsopen(false);

    if (noUpdate === true) {
      addList((oldItems) => {
        return [...oldItems, { reps, time, rest, name }];
      });

      setReps("");
      setTime("");
      setRest("");
      setName("");
    } else {
      //Items.splice(ID,1);
      Items.splice(ID, 1, { reps, time, rest, name });
      addList([...Items]);
      setReps("");
      setTime("");
      setRest("");
      setName("");
      // addList((oldItems) => {
      //   // oldItems.splice(ID,0,oldItems[ID]);
      //   return [...oldItems,{ reps, time, rest, name }];
      //   // return [...oldItems, oldItems[id]];
      // });
      // addList((oldItems) => {
      //    deleteItem(ID);
      //   // oldItems.splice(ID,0,oldItems[ID]);
      //   return [...oldItems];
      //   // return [...oldItems, oldItems[id]];
      // });

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

  return (
    <div>
      <Popup
        trigger={<Button icon="add" size="massive" onClick={twomethod} />}
        basic
      />

      <form>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsopen(false)}
          style={style1}
        >
          <Button icon="close" onClick={() => setModalIsopen(false)}></Button>

          <Dropdown
            placeholder="Select"
            fluid
            search
            selection
            options={exercise}
            value={name}
            onChange={handle}
          />

          <Button
            icon="video play"
            type="submit"
            onClick={() => setModalIsopen2(true)}
          ></Button>

          <Modal
            isOpen={modalIsOpen2}
            onRequestClose={() => setModalIsopen2(false)}
            style={style}
          >
            <iframe
              src={video}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          </Modal>

          <Form className="form">
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
            <Button type="submit" onClick={listOfItems}>
              Save
            </Button>

            <Divider hidden />
          </Form>
        </Modal>
      </form>

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
                  onCopy={callCopy}
                />
              </div>
            );
          })}
        </GridList> 
         
        {/* <DraggableList  width={400} height={400} rowSize={4}> */}
          {/* <div style={{ width: 300, height: 300, background: "green" }}>1</div>
          <div style={{ width: 300, height: 300, background: "blue" }}>2</div>
          <div style={{ width: 300, height: 300, background: "red" }}>3</div> */}
       
         
         {/* { lx.map((item, index) => {
            
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
           
          })} */}
          
        {/* </DraggableList> */}

        {/* {Items.map((item, index) => {
                  return (
                    
                    <div className="view">
                      
                       
                      <View key={index} id={index} data={item} onSelect={deleteItem} onEdit={callEdit} onCopy={callCopy} />
                    
                    </div>
                  );
                })} */}
      </ol>
    </div>
  );
};
export default Modalcall;
