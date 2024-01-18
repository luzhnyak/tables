import React, { FC, useEffect, useState } from "react";
import Table from "./Table";
import { campaigns } from "../../data/campaigns";
import { IСampaign } from "../../types";

const columns = [
  {
    key: "campaignId",
    title: "ID",
    typeData: "number",
    sort: true,
  },
  {
    key: "clicks",
    title: "Clicks",
    typeData: "number",
    sort: true,
  },
  {
    key: "cost",
    title: "Cost",
    typeData: "number",
    sort: true,
  },
  {
    key: "date",
    title: "Date",
    typeData: "Date",
    sort: true,
  },
];

interface IProps {
  id: number;
}

const CampaignTable: FC<IProps> = ({ id }) => {
  const [filtrCampaigns, setFiltrCampaigns] = useState<IСampaign[]>([]);

  useEffect(() => {
    setFiltrCampaigns(
      campaigns.filter((campaign) => campaign.profileId === id)
    );
  }, [id]);
  return (
    <Table
      data={filtrCampaigns}
      index="profileId"
      columns={columns}
      onClick={() => {
        alert("Test");
      }}
    ></Table>
  );
};

export default CampaignTable;
