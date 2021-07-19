import clsx from "clsx";
import React, { FC } from "react";
import { Group } from "../../shared/models";
import moment from "moment";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

interface Props {
  group: Group;
  onClick: (id: string) => void;
}

export const GroupItem: FC<Props> = ({ group, onClick }) => {
  const classes = useStyles();
  const { id, title, description, words, updated_at } = group;
  const { t } = useTranslation();

  const updated = moment(updated_at).format("HH:mm DD.MM.yyyy");
  return (
    <article className={classes.root} onClick={onClick.bind(null, id)}>
      <h4 className="mb-2 truncate">{title}</h4>
      <p className="description">{description}</p>
      <footer className={clsx(classes.footer)}>
        <sub>Words: {words || 0}</sub>
        <sub className={"date"}>Updated {updated}</sub>
      </footer>
    </article>
  );
};
