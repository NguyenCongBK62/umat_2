import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";

import { Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { setError, setLoading } from "actions/common";
import {
  createReservedRoute,
  deleteReservedRoute,
  fetchReservedRouteDetailsById,
  setIsCreatedReservedRoute,
  setReservedRouteDetails,
  updateReservedRoute,
} from "actions/reservedRoute";

import Layout from "containers/Layout";
import ReservedRouteMasterForm from "components/Form/ReservedRouteMasterForm";
import FormHeader from "components/FormHeader/index";
import DataSidePreview from "components/DataSidePreview";
import SettingsIcon from "components/Icons/SettingsIcon";

import _ from "lodash";
import auth from "utils/auth";

const { confirm } = Modal;

export default function ReservedRouteMasterCreateUpdate() {
  const history = useHistory();
  const dispatch = useDispatch();

  const methods = useForm({
    mode: "onChange",
  });
  const { handleSubmit, getValues, setValue, control } = methods;

  const role = auth.getKey("loginUser.role");
  const { id } = useParams();

  // useState
  const [isEdit, setIsEdit] = useState(false);
  const [loadedStoreId, setLoadedStoreId] = useState(null);
  const [loadedStoreName, setLoadedStoreName] = useState(null);

  // useSelector
  const created = useSelector(
    (state) =>
      state.reservedRouteMasterCreateUpdateReducer.isCreatedReservedRoute
  );
  var stores = useSelector((state) => state.layoutReducer.stores);

  const selectedStore = useSelector(
    (state) => state.layoutReducer.selectedStore
  );

  const loadedReservedRouteDetails = useSelector(
    (state) =>
      state.reservedRouteMasterCreateUpdateReducer.loadedReservedRouteDetails
  );

  // execute start of render
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      dispatch(setLoading(true));
      if (!loadedReservedRouteDetails) {
        dispatch(fetchReservedRouteDetailsById(id));
      }
    }
  }, []);

  useEffect(() => {
    if (id && loadedReservedRouteDetails) {
      setValue("name", loadedReservedRouteDetails.name);
      setValue("isDisplayed", loadedReservedRouteDetails.isDisplayed);
      setValue("stores", loadedReservedRouteDetails.storeId);
      setLoadedStoreId(loadedReservedRouteDetails.storeId);
    }
  }, [loadedReservedRouteDetails]);

  useEffect(() => {
    if (created) {
      history.push("/settings/reservation-route-master");
      dispatch(setIsCreatedReservedRoute(false));
    }
  }, [created]);

  useEffect(() => {
    if (stores && loadedReservedRouteDetails) {
      setLoadedStoreName(
        handleStoreSelection(loadedReservedRouteDetails.storeId)
      );
      dispatch(setReservedRouteDetails(null));
    }
  }, [stores]);

  // methods
  const handleStoreSelection = (id) => {
    const selected = stores.filter((s) => s.id === id);
    return selected[0].name;
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
          history.push("/settings/reservation-route-master/");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      history.push("/settings/reservation-route-master");
    }
  };

  const deleteReservedRouteById = () => {
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
        dispatch(deleteReservedRoute(id, selectedStore.id));
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
          dispatch(setError("??????????????????????????????????????????"));
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
        const isDisplayed = data.isDisplayed;
        data.isDisplayed = isDisplayed;

        if (id) {
          data.id = id;
          dispatch(updateReservedRoute(data));
        } else {
          dispatch(createReservedRoute(data));
        }
      },
      onCancel() {
        return false;
      },
    });
  };

  const dataPreview = [
    {
      heading: "????????????",
      items: [
        {
          label: "????????????",
          value: (watcher) => {
            const v = watcher.name ? `${watcher.name}` : "";
            return v || "";
          },
        },
        {
          label: "????????????",
          value: (watcher) => {
            let v = "";
            if (role === "admin" && !loadedStoreId) {
              _.forEach(
                watcher.stores,
                (m) => (v += m.id !== -2 ? `${m.name}, ` : "")
              );
              return v.slice(0, -2) || "";
            } else if (loadedStoreId && stores.length > 0) {
              v = loadedStoreName;
              return v || "";
            } else {
              v = selectedStore ? selectedStore.name : "";
              return v || "";
            }
          },
        },
        {
          label: "????????????",
          value: (watcher) => {
            let v = true;
            if (watcher.isDisplayed === true) {
              v = "??????";
            }
            if (watcher.isDisplayed === false) {
              v = "?????????";
            }
            return v || "";
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
            <ReservedRouteMasterForm
              control={control}
              stores={stores}
              role={role}
              selectedStore={selectedStore}
              loadedStoreId={loadedStoreId}
              loadedStoreName={loadedStoreName}
            />
          </Col>
          <DataSidePreview
            data={dataPreview}
            control={control}
            title={"??????????????????"}
            submitButtonTitle={id ? "????????????" : "????????????"}
            onCancel={onCancelHandler}
            isEdit={isEdit}
            deleteHandler={deleteReservedRouteById}
          />
        </Row>
      </form>
    </Layout>
  );
}
