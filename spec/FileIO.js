var waitsReady = function() {
    waitsFor(function() {
      return file_io.isReady();
    }, "file operation can't done", 3000);
};

describe("FileIO", function() {
  beforeEach(function() {
    file_io.init("test.txt", 1024*1024);
/*waitsFor�́A�n�����֐���true��Ԃ����w�肵���^�C���A�E�g�܂ő҂�
runs�ɓn�����֐��͒x���]�������
waitsFor�̌��ʂ�҂ꍇ��runs���g��
setUp��tearDown�������̂ŁAruns���ŏ��ƍŌ�Ɏg��
waitsFor���܂�it�ȍ~��describe����it�͒x���]�������*/
    waitsReady();
  });

  it("�����������̊m�F", function() {
    runs(function() {
      expect(file_io.grantedBytes).toEqual(1024*1024)
    });
  });

  it("�󕶎��Ńt�@�C���㏑�����ł���", function() {
    runs(function() {
      file_io.setText("");
      file_io.fileOperation(OPERATE.SAVE);
    });

    waitsReady();

    runs(function() {
     file_io.fileOperation(OPERATE.LOAD);
    });
    
    waitsReady();

    runs(function () {
  		expect(file_io.getText()).toEqual("");
  	});
  });

  it("�ۑ������������ǂݍ��߂�", function() {
    file_io.setText("saving text");
    file_io.fileOperation(OPERATE.SAVE);

    waitsReady();

    runs(function() {
      file_io.setText("");
      expect(file_io.getText()).toEqual("");
      // load
      file_io.fileOperation(OPERATE.LOAD);
    });

    waitsReady();

    runs(function () {
      expect(file_io.getText()).toEqual("saving text");
    });
    
  });

  it("�㏑����̃t�@�C���ǂݍ���", function() {
    file_io.setText("saving text");
    file_io.fileOperation(OPERATE.SAVE);

    waitsReady();

    // save second time
    runs(function () {
      file_io.setText("2nd time saving text!");
      file_io.fileOperation(OPERATE.SAVE);
    });

    waitsReady();

    runs(function () {
      file_io.setText("");
      expect(file_io.getText()).toEqual("");
      file_io.fileOperation(OPERATE.LOAD);
    });
    // load

    waitsReady();

    runs(function () {
      expect(file_io.getText()).toEqual("2nd time saving text!");
    });
  });

  it("�폜��̃t�@�C���ǂݏ���", function() {
    // remove
    file_io.setText("saving text");
    file_io.fileOperation(OPERATE.SAVE);

    waitsReady();

    runs (function() {
      file_io.fileOperation(OPERATE.REMOVE);
    });

    waitsReady();

    runs (function() {
      file_io.fileOperation(OPERATE.LOAD);
    });

    waitsReady();

    runs (function() {
     expect(file_io.getText()).toEqual("text empty");
     // save and load after remove.
     file_io.setText("saving text after remove");
     file_io.fileOperation(OPERATE.SAVE);
    });

    waitsReady();
    
    runs (function() {
      file_io.fileOperation(OPERATE.LOAD);
    });

    waitsReady();

    runs(function() {
      expect(file_io.getText()).toEqual("saving text after remove");
    });
  });
});