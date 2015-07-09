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
$fontLocation = "../fonts/";
?>
<script type="text/javascript">
    $(function(){
        var baseUnit = parseInt($('html').css("line-height"));
        var fontMainSize = parseInt($('html').css("font-size"));
        $('#font-main-size').attr('value', fontMainSize);
        $('#base-unit').attr('value', (baseUnit/fontMainSize).toFixed(1));
    });
</script>
<div class="container" >
  <label>Font size (px)</label>
  <input class="less-var-change" id="font-main-size" name="@font-main-size" data-suffix="px" type="number" step="1"/>
  <label>Base unit (line height, margins....)(rem)</label>
  <input id="base-unit" class="less-var-change" name="@base-unit"  data-suffix="rem" type="number" step="0.1"/>
  <label>Main font</label>
  <select id="font-main-url" data-prefix="'<?php echo $fontLocation; ?>" data-suffix="'" class="less-var-change" name="@font-main-url">
    <?php echo $fontList; ?>
  </select>
  <label>Alternative font</label>
  <select id="font-alt-url" data-prefix="'<?php echo $fontLocation; ?>" data-suffix="'" class="less-var-change" name="@font-main-url">
    <?php echo $fontList; ?>
  </select>
  <label>Third font</label>
  <select id="font-third-url" data-prefix="'<?php echo $fontLocation; ?>" data-suffix="'" class="less-var-change" name="@font-main-url">
    <?php echo $fontList; ?>
  </select>
  <p>
  <label>Main color</label>
  <input id="dominant" type="color" class="less-var-change" name="@dominant" />
  <label>Color scheme type</label>
  <select id="color-type" class="less-var-change" name="@color-type">
    <option value="op">Oposite colors</option>
    <option value="ana">Analogous colors</option>
    <option value="light">Light variations</option>
    <option value="sat">Saturation variations</option>
  </select>
  </p>
  <div class="color_test color_main">
    <span class="color_title">@color_main</span>
  </div>
  <div class="color_test subdom">
    <span class="color_title">@subdom</span>
    <input type="range" class="color-change" data-type="hue" />
    <input type="range" class="color-change" data-type="saturation"/>
    <input type="range" class="color-change" data-type="light"/>
    <input type="text" name="@subdom" />
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
    <button type="submit" id="save-settings">Save</button>
    <button type="button" id="close-settings">Close</button>
</form>
