import Swal from "sweetalert2";
const successAlert = (e) => {
  const alert=Swal.fire({
    title: {e},
    icon: "success",
    draggable: true,
  });
  return alert
};
export default successAlert
