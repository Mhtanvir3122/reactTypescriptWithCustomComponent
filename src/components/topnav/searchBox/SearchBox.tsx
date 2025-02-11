import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import classes from "./SearchBox.module.scss";
interface SearchBoxProps {
  searchKey: (value: string) => void;
}
function SearchBox({ searchKey }: SearchBoxProps) {
  const { t } = useTranslation();

  return (
    <div className={classes.searchBox}>
      <Icon
        icon="fluent:search-28-filled"
        width="14"
        style={{ fontWeight: "bold" }}
      />
      <input
        type="search"
        placeholder={t("search")}
        name="search"
        onChange={(e)=>searchKey(e?.target.value)
        }
        className={classes.searchBox_input}
      />
    </div>
  );
}

export default SearchBox;
