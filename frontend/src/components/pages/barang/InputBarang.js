import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BasicButton from "../../common/BasicButton";
import BasicTextField from "../../common/BasicTextField";

const useStyles = makeStyles({
  tableRoot: {
    height: "500px",
    width: "100%",
  },
  addButton: {
    display: "flex",
    marginBottom: "24px",
  },
});

const InputBarang = () => {
  const classes = useStyles();
  const [addModal, setAddModal] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      nama: "test nama1",
      jenis: "test jenis",
      volume: 1,
      hargaBeli: 123,
      hargaJual: 123,
    },
    {
      id: 2,
      nama: "test nama2",
      jenis: "test jenis",
      volume: 1,
      hargaBeli: 123,
      hargaJual: 123,
    },
    {
      id: 3,
      nama: "test nama3",
      jenis: "test jenis",
      volume: 1,
      hargaBeli: 123,
      hargaJual: 123,
    },
  ]);
  const columns = [
    {
      field: "nama",
      headerName: "Nama Barang",
      width: 200,
    },
    {
      field: "jenis",
      headerName: "Jenis Barang",
      width: 200,
    },
    {
      field: "volume",
      headerName: "Volume Kemasan",
      width: 200,
    },
    {
      field: "hargaBeli",
      headerName: "Harga Beli",
      width: 200,
    },
    {
      field: "hargaJual",
      headerName: "Harga Jual",
      width: 200,
    },
  ];

  const handleCloseAddModal = () => {
    setAddModal(false);
  };

  return (
    <div>
      <Dialog
        open={addModal}
        onClose={handleCloseAddModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tambah Barang</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Silakan masukan barang baru yang belum terdaftar.
          </DialogContentText>
          <form>
            <BasicTextField autoFocus id="nama" label="Nama Barang" />
            <BasicTextField id="jenis" label="Jenis Barang" fullWidth />
            <BasicTextField id="volume" label="Volume Kemasan" fullWidth />
            <BasicTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              id="hargaBeli"
              label="Harga Beli"
              fullWidth
            />
            <BasicTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              id="hargaJual"
              label="Harga Jual"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <BasicButton color="secondary" onClick={handleCloseAddModal}>
            Batal
          </BasicButton>
          <BasicButton onClick={handleCloseAddModal} color="primary">
            Tambah
          </BasicButton>
        </DialogActions>
      </Dialog>
      <div className={classes.addButton}>
        <BasicButton onClick={() => setAddModal(true)} startIcon={<AddIcon />}>
          Tambah Barang
        </BasicButton>
      </div>
      <div className={classes.tableRoot}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default InputBarang;
