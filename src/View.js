import React from "react";
import { Card, Button, Image} from "semantic-ui-react";

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
      <Button icon="edit" onClick={()=>{
        props.onEdit(props.id);
      }}></Button>

      <Button icon="copy" onClick={()=>{
        props.onCopy(props.id);
      }}></Button>

      <Card>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{props.data.name}</Card.Header>

          <Card.Description>
            {props.data.reps + "  reps "}
            {props.data.time + "   sec "}
            {props.data.rest + "   (s) rest  "}
          </Card.Description>
        </Card.Content>
      </Card>
      
    </div>
  );
};

export default View;
