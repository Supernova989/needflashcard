import React, { FC } from "react";
import moment from "moment";
import { getGroupURL } from "../shared/utils";
import history from "../history";
import Button from "../components/Button";
import Input from "../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";

export interface Group {
  id: string;
  title: string;
  description: string;
  sort: number;
  created_at: Date;
  updated_at: Date;
  words?: number;
}

const groups: Group[] = [
  {
    id: "group1",
    title: "Kitchen 1 wegwgwegw weg wegwegwegwgfa afafafaf fafas",
    description: "Kitchen items and furniture",
    sort: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "group2",
    title: "Kitchen 1",
    description: "Kitchen items and furniture hdfh dfhdfhd dfhdhdhdfh dfhdf dfhd hdfh dfhdfhdfhdfh dfh dfh dhdfh dsdg.",
    sort: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "group3",
    title: "Kitchen 1",
    description: "Kitchen items and furniture",
    sort: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "group4",
    title: "Kitchen 1",
    description: "Kitchen items and furniture",
    sort: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const searchSchema = Yup.object().shape({
  query: Yup.string().min(2, "Too Short!").max(120, "Too Long!"),
});

const GroupsPage: FC = () => {
  const handleLink = (id: string) => () => history.push(getGroupURL(id));

  return (
    <>
      <h1 className="mb-4">Your collections</h1>

      <div className={"mb-3"}>
        <Formik initialValues={{ query: "" }} validationSchema={searchSchema} onSubmit={({ query }, actions) => {}}>
          {({ values, touched, errors, ...props }) => (
            <form className="searchbar" autoComplete="off" autoCorrect="off" spellCheck={"false"}>
              <Input
                name="query"
                label={"Enter your search query here..."}
                block={true}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={values.query}
                error={errors.query}
                touched={touched.query}
              />

              <Button type="submit" variant={"contained"} color={"primary"}>
                Search
              </Button>
            </form>
          )}
        </Formik>
      </div>

      <ul className={"flex flex-wrap justify-between"}>
        {groups.map(({ id, title, description, updated_at, words }) => {
          const updated = moment(updated_at).format("HH:mm DD.MM.yyyy");
          return (
            <li key={id} className="collection-outer mb-3">
              <article className="collection-inner" onClick={handleLink(id)}>
                <h4 className="mb-2 title">{title}</h4>
                <p className="description">{description}</p>
                <footer>
                  <sub>Words: {words || 0}</sub>
                  <sub className={"date"}>Updated {updated}</sub>
                </footer>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default GroupsPage;
