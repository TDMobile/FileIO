describe("FileIO", function() {
  beforeEach(function() {
    file_io.init("test.txt");
/*waitsFor�́A�n�����֐���true��Ԃ����w�肵���^�C���A�E�g�܂ő҂�
runs�ɓn�����֐��͒x���]�������
waitsFor�̌��ʂ�҂ꍇ��runs���g��
setUp��tearDown�������̂ŁAruns���ŏ��ƍŌ�Ɏg��
waitsFor���܂�it�ȍ~��describe����it�͒x���]�������*/
    waitsFor(function() {
      return file_io.isStable();
    }, "file io can't init", 1000);
  });

  it("�󕶎��Ńt�@�C���㏑�����ł���", function() {
    file_io.setText("");
    file_io.fileOperation(OPERATE.SAVE);
    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function() {
     file_io.fileOperation(OPERATE.LOAD);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function () {
  		expect(file_io.getText()).toEqual("");
  	});
  });

  it("�ۑ������������ǂݍ��߂�", function() {
    file_io.setText("saving text");
    file_io.fileOperation(OPERATE.SAVE);
    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function() {
      file_io.setText("");
      expect(file_io.getText()).toEqual("");
      // load
      file_io.fileOperation(OPERATE.LOAD);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function () {
      expect(file_io.getText()).toEqual("saving text");
    });
    
  });

  it("�㏑����̃t�@�C���ǂݍ���", function() {
    file_io.setText("saving text");
    file_io.fileOperation(OPERATE.SAVE);
    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);
    // save second time
    runs(function () {
      file_io.setText("2nd time saving text!");
      file_io.fileOperation(OPERATE.SAVE);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function () {
      file_io.setText("");
      expect(file_io.getText()).toEqual("");
      file_io.fileOperation(OPERATE.LOAD);
    });
    // load
    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function () {
      expect(file_io.getText()).toEqual("2nd time saving text!");
    });
  });

  it("�폜��̃t�@�C���ǂݏ���", function() {
    // remove
    file_io.setText("saving text");
    file_io.fileOperation(OPERATE.SAVE);

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs (function() {
      file_io.fileOperation(OPERATE.REMOVE);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs (function() {
      file_io.fileOperation(OPERATE.LOAD);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs (function() {
     expect(file_io.getText()).toEqual("text empty");
     // save and load after remove.
     file_io.setText("saving text after remove");
     file_io.fileOperation(OPERATE.SAVE);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);
    
    runs (function() {
      file_io.fileOperation(OPERATE.LOAD);
    });

    waitsFor(function() {
      return file_io.isStable();
    }, "file operation can't done", 3000);

    runs(function() {
      expect(file_io.getText()).toEqual("saving text after remove");
    });
  });
});