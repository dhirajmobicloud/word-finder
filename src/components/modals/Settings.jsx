import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import Modal from "./Modal";

function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themes);
  const { t } = useTranslation();

  function changeTheme(isChecked) {
    const theme = isChecked ? "dark" : "light";
    dispatch.themes.setTheme(theme);
  }

  return (
    <Modal
      title="settings"
      body={
        <>
          <div className="settings-row">
            <div>
              <div className="settings-row__title">
                {t("settings.darkMode.title")}
              </div>
              <div className="settings-row__desc">
                {t("settings.darkMode.desc")}
              </div>
            </div>
            <div className="settings-row__checkbox">
              <Switch
                checked={theme === "dark"}
                onChange={changeTheme}
                onColor="#35bba6"
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={20}
                width={50}
                className="react-switch"
              />
            </div>
          </div>
        </>
      }
    />
  );
}

export default Settings;
