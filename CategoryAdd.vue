<template>
  <div>
    <el-dialog
      title="添加點檢類別"
      :visible.sync="dialogVisible"
      width="650px"
      @closed="close"
      center
    >
      <div>
        類別名稱：
        <el-input
          style="width: 200px;"
          class="inline-select"
          placeholder="請輸入類別名稱"
          :autofocus="true"
          ref="nameInput"
          v-model="form.inspTypeName"
        >
        </el-input>
        <div class="float-right">
          設備類別：
          <el-select style="width: 200px;" ref="typeSelect" v-model="form.inspTypeEqutype" placeholder="設備類別">
            <el-option
              v-for="(item, index) in euqTypes"
              :key="'id' + index"
              :label="item"
              :value="item">
              <span>{{ item }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="mt-1">
        <el-radio v-model="form.inspType" label="2">保養</el-radio>
        <el-radio v-model="form.inspType" label="1">單次點檢</el-radio>
        <el-radio v-model="form.inspType" label="3">日點檢（按天周期性點檢）</el-radio>
      </div>
      <div class="mt-1" v-show="shouldChooseDate">
        開始時間：
        <el-date-picker
          type="date"
          style="width: 200px;"
          v-model="form.inspTypeStarttime"
          :editable="false"
          ref="dateStart"
          @focus="dateErr=''"
          :picker-options="pickerOptions"
          placeholder="請選擇日期">
        </el-date-picker>
        <div class="float-right">
          結束時間：
          <el-date-picker
            type="date"
            style="width: 200px;"
            v-model="form.inspTypeEndtime"
            :editable="false"
            ref="dateEnd"
            :picker-options="pickerOptions"
            placeholder="請選擇日期">
          </el-date-picker>
        </div>
      </div>
      <div class="mt-1" v-if="dateErr">
        <span style="color: #cd2626;">
          <i class="el-icon-message-solid"></i>
          警告：{{ dateErr }}
        </span>
      </div>
      <div class="mt-1" v-show="form.inspType === '3'">
        <el-checkbox v-model="execImmediate">是否立即生成任務</el-checkbox>
        <div class="float-right" style="font-size: 12px;">
          <i class="el-icon-s-opportunity" style="color: #E6A23C;"></i>
          <span style="font-weight: bold; color: #E6A23C;">提示：</span>
          <span style="color: #888888;">選擇該項將立刻生成相應任務</span>
        </div>
      </div>
      <div class="mt-1">
        <span style="line-height: 34px;">檢查項目：</span>
        <span style="color: #cd2626;">{{ errMsg }}</span>
        <el-button plain icon="el-icon-plus" class="float-right" @click="addContent">
          新增項目
        </el-button>
        <el-input
          class="mt-1"
          placeholder="檢查項"
          type="textarea"
          v-model="content"
          ref="contentInput"
          @focus="errMsg=''"
          :autosize="{ minRows: 1, maxRows: 6 }"
        >
        </el-input>
        <div class="dialog-responsive" :style="contents.length > 0 ? { marginTop: '10px', maxHeight: '210px' }: { maxHeight: '210px' }">
          <el-alert
            :title="item.content"
            type="info"
            v-for="(item, index) in contents"
            :key="'id' + index"
            :style="index !== 0 && { marginTop: '10px' }"
            @close="spliceTasck(item)"
          >
          </el-alert>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInspection } from "../../../services/inspection/Category";

export default {
  data() {
    const form = getInspection().inspTypeModel;
    return {
      dialogVisible: false,
      form: form,
      contents: [],
      execImmediate: "",
      content: "",
      errMsg: "",
      dateErr: "",
      pickerOptions: {
        disabledDate: function(date) {
          let now = new Date();
          now.setDate(now.getDate() - 1);
          return date.valueOf() < now.valueOf();
        }
      }
    }
  },
  props: {
    visible: Boolean,
    formData: Object,
    euqTypes: Array
  },
  watch: {
    visible: function() {
      this.dialogVisible = this.visible;
    },
    formData: function() {
      this.form = this.formData.inspTypeModel;
      this.contents = this.formData.inspList;
      this.execImmediate = this.formData.execImmediate === "1";
    }
  },
  computed: {
    shouldChooseDate: function() {
      return this.form.inspType !== "3";
    }
  },
  mounted() {
    this.dialogVisible = this.visible;
  },
  methods: {
    initForm: function() {
      let data = getInspection();
      this.form = data.inspTypeModel;
      this.contents = data.inspList;
      this.execImmediate = data.execImmediate === "1";
    },
    close: function() {
      this.$emit("close");
    },
    save: function() {
      let execImmediate = "0";
      if (!this.checkForm()) return 0;
      if (this.form.inspType === '3' && this.execImmediate) execImmediate = "1";
      if (this.form.inspType !== '3' && this.checkDate(this.form.inspTypeStarttime)) execImmediate = "1";
      this.$emit("save", { execImmediate, inspTypeModel: this.form, inspList: this.contents });
    },
    checkForm: function() {
      let start = this.form.inspTypeStarttime;
      let end = this.form.inspTypeEndtime;
      if (!this.form.inspTypeName) {
        this.$refs.nameInput.focus();
        return false;
      } else if (!this.form.inspTypeEqutype) {
        this.$refs.typeSelect.focus();
        return false;
      } else if (this.form.inspType !== "3" && !start) {
        this.$refs.dateStart.focus();
        return false;
      } else if (this.form.inspType !== "3" && !end) {
        this.$refs.dateEnd.focus();
        return false;
      } else if (this.form.inspType !== "3" && new Date(start).valueOf() > new Date(end).valueOf()) {
        this.dateErr = "結束日期不能小於開始日期!";
        this.form.inspTypeStarttime = "";
        this.form.inspTypeEndtime = "";
        return false;
      } else if (this.contents.length === 0) {
        this.errMsg = "至少要有一條檢查項目!";
        return false;
      }
      return true;
    },
    checkDate: function(dateObj) {
      let now = new Date();
      let date = new Date(dateObj);
      return now.toLocaleDateString() === date.toLocaleDateString();
    },
    addContent: function() {
      if(this.content) {
        this.contents.push({ content: this.content, show: true });
        this.content = "";
        this.$refs.contentInput.focus();
      } else {
        this.errMsg = "內容不能爲空！";
      }
    },
    spliceTasck: function(item) {
      item.show = false;
    }
  }
}
</script>

<style lang="css" scoped>
.dialog-footer {
  text-align: center !important;
}
</style>
