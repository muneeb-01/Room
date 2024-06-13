import React from "react";

const MeeringRoom = ({ params }: { params: { id: string } }) => {
  return <div>MeeringRoom : {params.id}</div>;
};

export default MeeringRoom;
