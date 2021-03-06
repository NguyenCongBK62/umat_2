import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import FormHeader from "components/FormHeader/index";
import Layout from "containers/Layout";
import DataSidePreview from "components/DataSidePreview";
import SettingsIcon from "components/Icons/SettingsIcon";
import MenuMasterForm from "components/Form/MenuMasterForm";
import _ from "lodash";
import auth from "utils/auth";
import { setError, setLoading } from "actions/common";
import {
  createMenu,
  deleteMenu,
  fetchMenuDetailsById,
  setCreatedMenu,
  setLoadedMenuDetails,
  updateMenu,
} from "actions/menu";

const { confirm } = Modal;

export default function MenuMasterCreateUpdate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
  });

  const { handleSubmit, setValue, getValues, control } = methods;
  const [taxOption, setTaxOption] = useState([]);
  const role = auth.getKey("loginUser.role");
  const { id } = useParams();

  const created = useSelector(
    (state) => state.menuMasterCreateUpdateReducer.isCreatedMenu
  );
  const stores = useSelector((state) => state.layoutReducer.stores);
  const selectedStore = useSelector(
    (state) => state.layoutReducer.selectedStore
  );
  const loadedMenuDetails = useSelector(
    (state) => state.menuMasterCreateUpdateReducer.loadedMenuDetails
  );

  // execute start of render
  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      if (!loadedMenuDetails) {
        dispatch(fetchMenuDetailsById(id));
      }
    }
  }, []);

  useEffect(() => {
    if (id && loadedMenuDetails) {
      setValue("name", loadedMenuDetails.menu.name);
      setValue(
        "displayStatus",
        loadedMenuDetails.menu.displayStatus.toString()
      );
      setValue("price", loadedMenuDetails.menu.price);
      setValue("nameTaberogu", loadedMenuDetails.menu.nameTaberogu);
      setValue("nameGurunavi", loadedMenuDetails.menu.nameGurunavi);
      setValue("nameHotopepper", loadedMenuDetails.menu.nameHotopepper);
      setValue("tax", [loadedMenuDetails.menu.tax]);
      setTaxOption([loadedMenuDetails.menu.tax]);
      setValue("netReservationName", loadedMenuDetails.menu.netReservationName);
      dispatch(setLoadedMenuDetails(null));
    }
  }, [loadedMenuDetails]);

  useEffect(() => {
    if (created) {
      history.push("/settings/menu-master");
      dispatch(setCreatedMenu(false));
    }
  }, [created]);

  useEffect(() => {
    if (stores && loadedMenuDetails) {
      dispatch(setLoadedMenuDetails(null));
      dispatch(setLoading(false));
    }
  }, [stores]);

  // methods
  const onChangeTaxOption = (val) => {
    setTaxOption(val);
  };
  const onCancelHandler = () => {
    if (id) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        title: "??????",
        content: "??????????????????????????????????????????????????????????????????",
        okText: "??????",
        okType: "danger",
        cancelText: "?????????",
        centered: true,
        onOk() {
          history.push("/settings/menu-master");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      history.push("/settings/menu-master");
    }
  };
  const deleteMenuById = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "??????",
      content:
        "?????????????????????????????????????????????????????????????????????????????????????????????????????????",
      okText: "??????",
      okType: "danger",
      cancelText: "?????????",
      centered: true,
      onOk() {
        dispatch(setLoading(true));
        dispatch(deleteMenu(id, selectedStore.id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const onSubmit = (data) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "??????",
      content: id
        ? "??????????????????????????????????????????"
        : "??????????????????????????????????????????",
      okText: "??????",
      okType: "danger",
      cancelText: "?????????",
      centered: true,
      onOk() {
        const checkboxStores = [];
        if (data.name === "") {
          dispatch(setError("?????????????????????????????????????????????"));
          return false;
        }
        if (isNaN(selectedStore.id)) {
          dispatch(setError("??????????????????????????????????????????"));
          return false;
        }
        if (role === "admin") {
          if (!id) {
            const stores = getValues("stores");
            stores.forEach((item) => {
              if (item.id !== -2) checkboxStores.push(item.id);
            });
          } else {
            checkboxStores.push(selectedStore.id);
          }
        } else if (role === "user") {
          checkboxStores.push(selectedStore.id);
        }
        if (checkboxStores.length === 0) {
          dispatch(setError("??????????????????????????????????????????"));
          return false;
        }
        data.stores = checkboxStores;
        data.storeId = selectedStore.id;
        data.tax = data.tax[0] === true || false;
        data.price = data.price ? data.price : "0";
        dispatch(setLoading(true));
        if (id) {
          data.id = id;
          dispatch(updateMenu(data));
        } else dispatch(createMenu(data));
      },
      onCancel() {
        return false;
      },
    });
  };
  const dataPreview = [
    {
      heading: "??????????????????",
      items: [
        {
          label: "??????????????? ",
          value: (watcher) => {
            const v = watcher.name ? `${watcher.name}` : "";
            return v || "";
          },
        },
        {
          label: "????????????????????????????????????????????? ",
          value: (watcher) => {
            const v = watcher.netReservationName
              ? `${watcher.netReservationName}`
              : "";
            return v || "";
          },
        },
        {
          label: "?????? ",
          value: (watcher) => {
            let v =
              watcher.price >= 0 && watcher.price !== null
                ? `${watcher.price}???`
                : "";
            v += watcher.tax && watcher.tax[0] ? " (??????)" : "";
            return v || "";
          },
        },
        {
          label: "????????????",
          value: (watcher) => {
            let v = "";
            if (role === "admin" && !id) {
              _.forEach(
                watcher.stores,
                (m) => (v += m.id !== -2 ? `${m.name}, ` : "")
              );
              return v.slice(0, -2) || "";
            } else {
              v = selectedStore ? selectedStore.name : "";
              return v || "";
            }
          },
        },
        {
          label: "????????????",
          value: (watcher) => {
            const v =
              watcher.displayStatus && watcher.displayStatus === "false"
                ? "?????????"
                : "??????";
            return v || "";
          },
        },
      ],
    },
    {
      heading: "??????????????????????????????",
      items: [
        {
          label: "????????????",
          value: (watcher) => {
            const v = watcher.nameTaberogu ? `${watcher.nameTaberogu} ` : "";
            return v;
          },
        },
        {
          label: "????????????",
          value: (watcher) => {
            const v = watcher.nameGurunavi ? `${watcher.nameGurunavi} ` : "";
            return v;
          },
        },
        {
          label: "?????????????????????",
          value: (watcher) => {
            const v = watcher.nameHotopepper
              ? `${watcher.nameHotopepper} `
              : "";
            return v;
          },
        },
      ],
    },
  ];
  return (
    <Layout>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          title={id ? "?????????????????????" : "???????????????????????????"}
          icon={<SettingsIcon width={"28"} height={"28"} />}
        />
        <Row wrap={false}>
          <Col flex="auto">
            <MenuMasterForm
              control={control}
              stores={stores}
              role={role}
              selectedStore={selectedStore}
              isEdit={!!id}
              taxOption={taxOption}
              onChangeTaxOption={onChangeTaxOption}
            />
          </Col>
          <DataSidePreview
            data={dataPreview}
            control={control}
            title={"?????????????????????"}
            submitButtonTitle={id ? "????????????" : "????????????"}
            onCancel={onCancelHandler}
            isEdit={!!id}
            deleteHandler={deleteMenuById}
          />
        </Row>
      </form>
    </Layout>
  );
}
