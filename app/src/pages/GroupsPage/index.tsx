import React, { BaseSyntheticEvent, FC, useEffect, useRef, useState } from "react";
import { getGroupURL, getWordURL } from "../../shared/utils";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GroupItem } from "../../components/GroupItem";
import clsx from "clsx";
import { useClickAwayListener } from "../../hooks/useClickAwayListener";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getGroups } from "../../redux/reducers/@groups/actions";
import AddGroupDialog from "./AddGroupDialog";
import WordSearch from "../../components/WordSearch";

const GroupsPage: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { groups: groupState } = useSelector((state: RootState) => state);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return (
    <Page heading={"Your groups"}>
      <div className={"mt-2 mb-3"}>
        <WordSearch onSelect={(id) => history.push(getWordURL(id))} />
        <Button
          className={"ml-1"}
          color="primary"
          variant={"contained"}
          startIcon={"PLUS"}
          onClick={setShowAddDialog.bind(null, true)}
        >
          {t("BUTTONS.ADD_GROUP")}
        </Button>
      </div>

      <ul className={"flex flex-wrap justify-between"}>
        {groupState.items.map((group) => {
          return (
            <li key={group.id} className={clsx("mb-3", classes.group)}>
              <GroupItem group={group} onClick={(id: string) => history.push(getGroupURL(id))} />
            </li>
          );
        })}
      </ul>

      <AddGroupDialog show={showAddDialog} onCancel={setShowAddDialog.bind(null, false)} />
    </Page>
  );
};

export default GroupsPage;
