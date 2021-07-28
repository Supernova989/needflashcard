import React, { BaseSyntheticEvent, FC, useEffect, useRef, useState } from "react";
import { getGroupURL } from "../../shared/utils";
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

const QUERY_MAX_LENGTH = 120;

export const searchSchema = Yup.object({
  query: Yup.string().min(3).max(QUERY_MAX_LENGTH),
});

export type SearchFormFields = Yup.InferType<typeof searchSchema>;

const GroupsPage: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const formRef = useRef<FormikProps<SearchFormFields> | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { groups: groupState } = useSelector((state: RootState) => state);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const searchInputTimeoutRef = useRef<undefined | NodeJS.Timeout>();
  const searchRef = useClickAwayListener(() => setSearchSuggestions([]));

  useEffect(() => {
    dispatch(getGroups());
    return () => {
      if (searchInputTimeoutRef.current) {
        clearTimeout(searchInputTimeoutRef.current);
      }
    };
  }, []);

  const handlePickSuggestion = (suggestion: string) => {
    setSearchSuggestions([]);
    if (formRef.current) {
      formRef.current?.setFieldValue("query", suggestion);
    }
  };

  const handleSearchChange = (e: BaseSyntheticEvent) => {
    if (searchInputTimeoutRef.current) {
      clearTimeout(searchInputTimeoutRef.current);
    }
    searchInputTimeoutRef.current = setTimeout(() => {
      setSearchSuggestions([...searchSuggestions, e.target.value]);
    }, 1000);
  };

  return (
    <Page heading={"Your groups"}>
      <div className={"mt-2 mb-3"}>
        <Formik
          innerRef={formRef}
          initialValues={{ query: "" }}
          validationSchema={searchSchema}
          onSubmit={({ query }, actions) => {}}
        >
          {({ values, touched, errors, ...props }) => (
            <form
              onSubmit={props.handleSubmit}
              className={clsx(classes.searchBlock)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={"false"}
            >
              <Input
                name="query"
                label={"Enter your search query here..."}
                block={true}
                onChange={(e: BaseSyntheticEvent) => {
                  handleSearchChange(e);
                  props.handleChange(e);
                }}
                onBlur={props.handleBlur}
                value={values.query}
                error={t(errors.query!)}
                touched={touched.query}
                ref={searchRef}
                maxLength={QUERY_MAX_LENGTH}
                autoCompletion={{
                  list: searchSuggestions,
                  onClick: handlePickSuggestion,
                }}
              />

              <Button type="submit" variant={"contained"} color={"primary"} startIcon={"SEARCH"}>
                {t("COMMON.SEARCH")}
              </Button>

              <Button
                className={"ml-1"}
                color="primary"
                variant={"contained"}
                startIcon={"PLUS"}
                onClick={setShowAddDialog.bind(null, true)}
              >
                {t("BUTTONS.ADD_GROUP")}
              </Button>
              <Button className={"ml-1"} color="primary" variant={"contained"} startIcon={"FILTER"} />
            </form>
          )}
        </Formik>
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
