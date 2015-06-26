<?php
$handle = opendir('../fonts') or die ("Can't find of read font folder");
$fontList = '';
while (false !== ($entry = readdir($handle))) {
    if ($entry == '.' or $entry == '..') {
        continue;
    } else {
        $fontList .= '"<option value="'.$entry.'">'.$entry.'</option>';
    }
}
?>
<script type="text/javascript">
    $(function(){
        var baseUnit = parseInt($('html').css("line-height"));
        var fontMainSize = parseInt($('html').css("font-size"));
        $('#font-main-size').attr('value', fontMainSize);
        $('#base-unit').attr('value', (baseUnit/fontMainSize).toFixed(1));
    });
</script>
<form action="/update_config.php" method="post" class="container" >
  <label>Font size (px)</label>
  <input id="font-main-size" name="@font-main-size" data-unit="px" type="number" step="1"/>
  <label>Base unit (line height, margins....)(rem)</label>
  <input id="base-unit" name="@base-unit" data-unit="rem" type="number" step="0.1"/>
  <select id="color-type" name="@color-type">
    <option value="op">Oposite colors</option>
    <option value="ana">Analogous colors</option>
    <option value="light">Light variations</option>
    <option value="sat">Saturation variations</option>
  </select>
  <label>Main font</label>
  <select id="font-main-url" name="@font-main-url">
    <?php echo $fontList; ?>
  </select>
  <label>Alternative font</label>
  <select id="font-alt-url" name="@font-main-url">
    <?php echo $fontList; ?>
  </select>
  <label>Third font</label>
  <select id="font-third-url" name="@font-main-url">
    <?php echo $fontList; ?>
  </select>
  <p>
  <input id="dominant" type="color" name="@dominant" />
  </p>
  <div class="color_test color_main">
    <span class="color_title">@color_main</span>
  </div>
  <div class="color_test subdom">
    <span class="color_title">@subdom</span>
  </div>
  <div class="color_test subdom2">
    <span class="color_title">@subdom2</span>
  </div>
  <div class="color_test bg">
    <span class="color_title">@bg</span>
  </div>
  <div class="color_test tonic">
    <span class="color_title">@tonic</span>
  </div>
  <div class="color_test bg">
    <span class="color_title">@color_main (@bg)</span>
    <div class="color_test_inner color_main">
    </div>
  </div>
  <div class="color_test tonic2">
    <span class="color_title">@subdom2 (@tonic2)</span>
    <div class="color_test_inner subdom2">
    </div>
  </div>
  <div class="color_test tonic3">
    <span class="color_title">@subdom (@tonic3)</span>
    <div class="color_test_inner subdom">
    </div>
  </div>
  <div class="color_test subdom">
    <span class="color_title">@color_neg (@color_main)</span>
    <div class="color_test_inner color_main">
    </div>
  </div>
  <div class="color_test tonic2">
    <span class="color_title">@tonic2 (@color_neg)</span>
    <div class="color_test_inner color_neg">
    </div>
  </div>
  <br/>
    <button type="submit" id="save_settings">Save</button>
    <button type="button" id="close_settings">Close</button>
</form>
