import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import MaterialTable, { MTableToolbar } from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { AppContext } from "../../contexts/AppContext.jsx";

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const label = "DeluxeTable";
let logg;
let promiseKeeper;

// const columns = [
//   { title: "Title", field: "title" },
//   { title: "Artist", field: "artist" },
//   { title: "Written By", field: "written_by" },
//   { title: "Producer", field: "producer" },
//   { title: "Label", field: "label" },
//   { title: "Is Cover", field: "is_cover" },
//   { title: "Original Performer", field: "original_performer" },
//   { title: "Images", field: "images" },
//   {
//     title: "Lyrics",
//     field: "lyrics"
//   },
//   { title: "Lang", field: "lang" }
// ];

const DeluxTable = props => {
  const [appUtils] = useContext(AppContext);
  const { PromiseKeeper, Logger, emptyFunc } = appUtils;
  promiseKeeper = promiseKeeper || new PromiseKeeper({ label });
  logg = logg || new Logger({ label }).logg;

  const [data, setData] = useState([]);

  useEffect(() => {
    logg("useEffect called with data: ", props.data);
    setData(props.data);
  }, [props.data]);

  return (
    <MaterialTable
      title={props.title || ""}
      columns={props.columns || []}
      data={data}
      icons={tableIcons}
      options={{
        ...props.options,
        title: props.title ? true : false,
        pageSize:
          props.numRows || (props.options && props.options.pageSize) || 5
      }}
      onRowClick={props.onRowClick}
      detailPanel={props.detailPanel || emptyFunc}
      localization={
        props.emptyMsg && {
          body: { emptyDataSourceMessage: props.emptyMsg }
        }
      }
      components={{
        Toolbar: props => (
          <div className="toolbar-plus">
            <div className="db-area-placeholder"></div>
            <MTableToolbar {...props} />
          </div>
        )
      }}
      editable={
        props.isEditable && {
          onRowAdd: !props.onRowAdd
            ? null
            : newRowData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const _data = [...data];
                    logg("Added new row:", newRowData);
                    _data.push(newRowData);
                    setData(_data);
                    props.onRowAdd(_data, newRowData);
                  }, 600);
                }),
          onRowUpdate: !props.onRowUpdate
            ? null
            : (newRowData, oldRowData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const _data = [...data];
                    //since oldRowData is a *reference* to an object inside the data state, we can leverage that to cheaply look it up inside the data state, and replace it with newRowData.
                    _data[_data.indexOf(oldRowData)] = newRowData;
                    logg("Updated row:", newRowData);
                    setData(_data);
                    props.onRowUpdate(_data, newRowData, oldRowData);
                  }, 600);
                }),
          onRowDelete: !props.onRowDelete
            ? null
            : async deletedRow => {
                const _data = [...data];
                const deleted = await props.onRowDelete(_data, deletedRow);
                if (!deleted) {
                  return false;
                }
                logg("Deleting table row.");
                _data.splice(_data.indexOf(deletedRow), 1);
                setData(_data);
                return true;
              }
        }
      }
    />
  );
};

DeluxTable.propTypes = {
  options: PropTypes.object,
  detailPanel: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  onRowAdd: PropTypes.func,
  onRowUpdate: PropTypes.func,
  onRowDelete: PropTypes.func,
  dataName: PropTypes.string,
  title: PropTypes.string,
  emptyMsg: PropTypes.string,
  editable: PropTypes.bool,
  search: PropTypes.bool,
  toolbar: PropTypes.bool,
  numRows: PropTypes.bool
};

export default DeluxTable;
