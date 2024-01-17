import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { accounts } from "./data/accounts";

import "./App.css";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import ProfileTable from "./components/Table/ProfileTable";

const columns = [
  {
    key: "accountId",
    title: "ID",
    typeData: "number",
    sort: true,
  },
  {
    key: "email",
    title: "Email",
    typeData: "string",
    sort: true,
  },
  {
    key: "authToken",
    title: "Token",
    typeData: "string",
    sort: true,
  },
  {
    key: "creationDate",
    title: "Creation date",
    typeData: "Date",
    sort: true,
  },
];

function App() {
  const [isModal, setIsModal] = useState<boolean>(true);
  const [id, setId] = useState<number>(0);

  const closeModal = () => {
    setIsModal(false);
  };

  const openModal = (id: number) => {
    setId(id);
    setIsModal(true);
  };

  return (
    <div className="App">
      <Table
        data={accounts}
        index="accountId"
        columns={columns}
        onClick={openModal}
      />
      {isModal && (
        <Modal title="Profile" onClose={closeModal}>
          <ProfileTable id={id} />
        </Modal>
      )}
    </div>
  );
}

export default App;
