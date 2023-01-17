<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '35%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px">
          <i class="pi pi-stop" style="font-size: 20px" /> Nueva categoría
        </h3>
      </template>

      <div style="margin-top: 5px; width: 100%">
        <!-- <h5 style="margin: 0px">DNI</h5> -->
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid"
          style="margin-top: 30px"
        >
          <!-- Nombre -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="nombre"
                type="text"
                v-model="form.nombre"
                style="width: 100%"
                :class="{ 'p-invalid': v$.nombre.$invalid && submitted }"
              />
              <label
                for="nombre"
                :class="{ 'p-error': v$.nombre.$invalid && submitted }"
                >Nombre</label
              >
            </div>
            <small
              v-if="
                (v$.nombre.$invalid && submitted) ||
                v$.nombre.$pending.$response
              "
              class="p-error"
              >{{
                v$.nombre.required.$message.replace("Value", "Nombre")
              }}</small
            >
          </div>

          <!-- Descripción -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="nombre"
                type="text"
                v-model="form.descripcion"
                style="width: 100%"
                :class="{ 'p-invalid': v$.descripcion.$invalid && submitted }"
              />
              <label
                for="nombre"
                :class="{ 'p-error': v$.descripcion.$invalid && submitted }"
                >Descripción</label
              >
            </div>
            <small
              v-if="
                (v$.descripcion.$invalid && submitted) ||
                v$.descripcion.$pending.$response
              "
              class="p-error"
              >{{
                v$.descripcion.required.$message.replace("Value", "Descripción")
              }}</small
            >
          </div>
        </form>
      </div>

      <template #footer>
        <Button
          label="Guardar"
          type="submit"
          icon="pi pi-check"
          autofocus
          @click="guardar()"
          :loading="loadingBtnGuardar"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      form: {
        nombre: null,
        descripcion: null,
      },
    };
  },

  validations() {
    return {
      codigo: {
        required: helpers.withMessage("El código es requerido", required),
        // email,
      },
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },
      precioVenta: {
        required: helpers.withMessage(
          "El precio de venta es requerido",
          required
        ),
        // email,
      },
      procPrecioFiado: {
        required: helpers.withMessage(
          "El precio de fiado es requerido",
          required
        ),
        // email,
      },
      stock: {
        required: helpers.withMessage(
          "El precio de fiado es requerido",
          required
        ),
        // email,
      },
      stockMinimo: {
        required: helpers.withMessage(
          "El precio de fiado es requerido",
          required
        ),
        // email,
      },
    };
  },

  methods: {
    abrir() {
      this.submitted = false;
      console.log("abrir");
      this.display = true;
      this.isFormValid = false;
      this.resetForm();
    },

    cerrar() {
      this.$toast.add({
        severity: "error",
        summary: "Ventana cerrada con éxito",
        detail: "Message Content",
        life: 3000,
      });
      this.display = false;
    },

    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },

    imagenSeleccionada(event) {
      console.log("imagen");
      console.log(event.files[0]);
      this.form.imagen = event.files[0];
    },

    handleSubmit(isFormValid) {
      this.isFormValid = isFormValid;

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },

    resetForm() {
      this.form.codigo = null;
      this.form.nombre = null;
      this.form.precioVenta = null;
      this.form.procPrecioFiado = null;
      this.form.stock = null;
      this.form.stockMinimo = null;
      this.form.imagen = null;
      this.submitted = false;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      // console.log("this.form");
      // console.log(this.form);
      // this.$emit("update:nuevoEmpleado", this.form);

      // codigo: null,
      //   nombre: null,
      //   precioVenta: null,
      //   precioFiado: null,
      //   stock: null,
      //   stockMinimo: null,
      //   imagen: null,

      let formData = new FormData();

      // formData.set("codigo", this.form.codigo)
      // formData.set("nombre", this.form.nombre)
      // formData.set("precioVenta", this.form.precioVenta)
      // formData.set("precioFiado", this.form.precioFiado)
      // formData.set("stock", this.form.stock)
      // formData.set("stockMinimo", this.form.stockMinimo)
      // formData.append("imagen", this.form.imagen)

      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }

      console.log("formData");
      console.log(formData);

      await this.axios
        .post("/api/producto/crear", formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto creado con éxito",
              life: 3000,
            });

            this.display = false;
            this.$emit("actualizar-tabla");
          } else {
            console.log("response.data.data");
            console.log(response.data.data);

            for (const property in response.data.data) {
              // console.log(`${property}: ${response.data.data[property]}`);
              this.$toast.add({
                severity: "error",
                summary: "Se ha producido un error",
                detail: `${response.data.data[property]}`,
                life: 5000,
              });
            }
            // this.$toast.add({
            //   severity: "success",
            //   summary: "Se ha producido un error",
            //   detail: response.data.data,
            //   life: 5000,
            // });
          }
        });

      this.loadingBtnGuardar = false;
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

.header {
  margin: 0px !important;
}

.p-dialog {
  border-radius: 30% !important;
}
</style>