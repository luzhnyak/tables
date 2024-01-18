import React, { FC, useEffect, useState } from "react";
import Table from "./Table";
import { profiles } from "../../data/profiles";
import { IProfile } from "../../types";

const columns = [
  {
    key: "profileId",
    title: "ID",
    typeData: "number",
    sort: true,
  },
  {
    key: "marketplace",
    title: "Marketplace",
    typeData: "string",
    sort: true,
  },
  {
    key: "country",
    title: "Country",
    typeData: "string",
    sort: true,
  },
];

interface IProps {
  onClick: (id: number) => void;
  id: number;
}

const ProfileTable: FC<IProps> = ({ id, onClick }) => {
  const [filtrProfiles, setFiltrProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    setFiltrProfiles(profiles.filter((profile) => profile.accountId === id));
  }, [id]);

  return (
    <Table
      data={filtrProfiles}
      index="profileId"
      columns={columns}
      onClick={(id: number) => {
        onClick(id);
      }}
    ></Table>
  );
};

export default ProfileTable;
