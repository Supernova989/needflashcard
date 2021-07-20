import React, { BaseSyntheticEvent, FC, useEffect, useRef, useState } from "react";
import { getGroupURL } from "../../shared/utils";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { TFunction, useTranslation } from "react-i18next";
import { GroupItem } from "../../components/GroupItem";
import clsx from "clsx";
import { useClickAwayListener } from "../../hooks/useClickAwayListener";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getGroups } from "../../redux/reducers/@groups/actions";

export const getSearchSchema = (t: TFunction) =>
  Yup.object().shape({
    query: Yup.string().min(3, t("ERRORS.TOO_SHORT")).max(120, t("ERRORS.TOO_LONG")),
  });

const GroupsPage: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { groups: groupState } = useSelector((state: RootState) => state);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
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

  const handleLink = (id: string) => history.push(getGroupURL(id));

  const handlePickSuggestion = (props: FormikHelpers<{ query: string }>) => (suggestion: string) => {
    props.setFieldValue("query", suggestion);
    setSearchSuggestions([]);
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
    <Page heading={"Your collections"}>
      <div className={"mb-3"}>
        <Formik
          initialValues={{ query: "" }}
          validationSchema={getSearchSchema(t)}
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
                error={errors.query}
                touched={touched.query}
                ref={searchRef}
                autoCompletion={{
                  list: searchSuggestions,
                  onClick: handlePickSuggestion(props),
                }}
              />

              <Button type="submit" variant={"contained"} color={"primary"}>
                {t("COMMON.SEARCH")}
              </Button>
            </form>
          )}
        </Formik>
      </div>

      <ul className={"flex flex-wrap justify-between"}>
        {groupState.items.map((group) => {
          return (
            <li key={group.id} className={clsx("mb-3", classes.group)}>
              <GroupItem group={group} onClick={handleLink} />
            </li>
          );
        })}
      </ul>
    </Page>
  );
};

export default GroupsPage;
