import React from "react";
import { Card, Button, Image, Grid } from "semantic-ui-react";

import "./Modal.css";

const View = (props) => {
  return (
    <div>
      <Button
        icon="close"
        onClick={() => {
          props.onSelect(props.id);
        }}
      ></Button>
      <Button
        icon="edit"
        onClick={() => {
          props.onEdit(props.id);
        }}
      ></Button>

      {/* <Button icon="copy" onClick={()=>{
        props.onCopy(props.id);
      }}></Button> */}

      <Card>
        <Card.Content>
          <Card.Header>{props.data.name}</Card.Header>
        </Card.Content>

        <br />

        <div style={{ textAlign: "center" }}>
          <iframe
            src={props.video}
            frameborder="0"
            allowFullScreen
            title="video"
            width="80%"
            height="80%"
          />
        </div>
        <Card.Content>
          <Card.Description>
            {props.data.reps + "  reps "}
            {props.data.time + "   sec "}
            {props.data.rest + "   (s) rest  "}
          </Card.Description>
          <br />
        </Card.Content>
      </Card>
    </div>
  );
};

export default View;
