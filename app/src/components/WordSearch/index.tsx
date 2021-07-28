import React, { BaseSyntheticEvent, FC, useEffect, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import clsx from "clsx";
import Input from "../Input";
import Button from "../Button";
import { useClickAwayListener } from "../../hooks/useClickAwayListener";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { SearchWordSuggestion } from "../../redux/reducers/@wordSearch/interfaces";
import { searchWords } from "../../redux/reducers/@wordSearch/actions";

const QUERY_MAX_LENGTH = 120;

interface Props {
  onSelect: (id: string) => void;
}

export const searchSchema = Yup.object({
  query: Yup.string().min(3).max(QUERY_MAX_LENGTH).required().trim(),
});

export type SearchFormFields = Yup.InferType<typeof searchSchema>;

const WordSearch: FC<Props> = ({ onSelect }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { queries } = useSelector((state: RootState) => state.wordSearch);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchWordSuggestion[]>([]);
  const searchRef = useClickAwayListener(() => setSearchSuggestions([]));
  const formRef = useRef<FormikProps<SearchFormFields> | null>(null);
  const searchInputTimeoutRef = useRef<undefined | NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (searchInputTimeoutRef.current) {
        clearTimeout(searchInputTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e: BaseSyntheticEvent) => {
    if (searchInputTimeoutRef.current) {
      clearTimeout(searchInputTimeoutRef.current);
    }
    if (queries[e.target.value]) {
      setSearchSuggestions(queries[e.target.value]);
      return;
    }
    searchInputTimeoutRef.current = setTimeout(async () => {
      try {
        const suggestions = await dispatch(searchWords(e.target.value.trim())).unwrap();
        setSearchSuggestions(suggestions);
      } catch (e) {}
    }, 1000);
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={{ query: "" }}
      validationSchema={searchSchema}
      onSubmit={({ query }, actions) => {
        history.push(`${ROUTES.WORD_SEARCH}?q=${query.trim()}`);
      }}
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
            label={"Word search"}
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
              onSelect: onSelect,
            }}
          />

          <Button type="submit" variant={"contained"} color={"primary"} startIcon={"SEARCH"}>
            {t("COMMON.SEARCH")}
          </Button>

          <Button className={"ml-1"} color="primary" variant={"outlined"} startIcon={"FILTER"} />
        </form>
      )}
    </Formik>
  );
};

export default WordSearch;
