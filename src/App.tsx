import React, { useState, ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { accounts } from "./data/accounts";

import "./App.css";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import ProfileTable from "./components/Table/ProfileTable";
import CampaignTable from "./components/Table/CampaignTable";
import { createPortal } from "react-dom";

const modalRoot1 = document.querySelector("#modal-root-1") as Element;
const modalRoot2 = document.querySelector("#modal-root-2") as Element;

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
  const [isModalProfile, setIsModalProfile] = useState<boolean>(false);
  const [isModalCampaign, setIsModalCampaign] = useState<boolean>(false);
  const [idProfile, setIdProfile] = useState<number>(0);
  const [idCampaign, setIdCampaign] = useState<number>(0);

  const closeModal = (entity: string) => {
    console.log(entity);

    switch (entity) {
      case "profile":
        console.log(entity);
        setIsModalProfile(false);
        break;
      case "campaign":
        console.log(entity);
        setIsModalCampaign(false);
        break;
      default:
        break;
    }
  };

  const openModal = (entity: string, id: number) => {
    switch (entity) {
      case "profile":
        setIdProfile(id);
        setIsModalProfile(true);
        break;
      case "campaign":
        setIdCampaign(id);
        setIsModalCampaign(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Table
        data={accounts}
        index="accountId"
        columns={columns}
        onClick={(id: number) => {
          openModal("profile", id);
        }}
      />
      {isModalProfile &&
        createPortal(
          <Modal
            title="Profiles"
            onClose={closeModal}
            entity="profile"
            size="large"
          >
            <ProfileTable
              id={idProfile}
              onClick={(id: number) => openModal("campaign", id)}
            />
          </Modal>,
          modalRoot1
        )}
      {isModalCampaign &&
        createPortal(
          <Modal title="Campaigns" onClose={closeModal} entity="campaign">
            <CampaignTable id={idCampaign} />
          </Modal>,
          modalRoot2
        )}
    </div>
  );
}

export default App;
