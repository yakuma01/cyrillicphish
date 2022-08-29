#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys

def rtf2js(rtfFile, jsFile, outFile, country,toolbar):
    assert len(country) == 2, "The length of the country must be 2 letters only (country 2 letter code)"
    final_str = country+'_Dict = {\n'
    list_of_maps = []
    tmp_str = ''
    if country == 'AU':
        with open(rtfFile, 'r') as src:
            for line in src:
                if line.replace(' ','').startswith('//'):
                    continue
                tmp_str += line.replace('\n','').replace('\xe2\x80\x98',"'").replace('\xe2\x80\x99',"'")
    elif country == 'ZA':
        with open(rtfFile, 'r') as src:
            for line in src:
                if line.replace(' ', '').startswith('//'):
                    if '_bitmap' in line:
                        name = line[2:].split('_bitmap')[0]
                        tmp_str += "'" + name + "':"
                    else:
                        pass
                elif '</map>' in line:
                    tmp_str += line.replace('\n', '').replace('\xe2\x80\x98', "'").replace('\xe2\x80\x99', "'")
    elif country == 'GB':
        with open(rtfFile, 'r') as src:
            for line in src:
                if line.replace(' ', '').startswith('//'):
                    continue
                tmp_str += line.replace('\n', '').replace('\xe2\x80\x98', "'").replace('\xe2\x80\x99', "'")
    else:
        raise ValueError('The country code is not defined, you should implement it first.')

    quote_indices = [q for q,r in enumerate(tmp_str) if r =="'"]
    for ii in range (2,len(quote_indices),2):
        list_of_maps.append(tmp_str[quote_indices[ii-2]:quote_indices[ii]])
    list_of_maps.append(tmp_str[quote_indices[len(quote_indices)- 2]:])
    for each_map in list_of_maps:
        name = each_map.split(':')[0].replace("'", '')
        if country == 'GB': name = name.split('_UK_910')[0]
        if country == 'AU': name = name.split('_au_910')[0]
        circle_coords=  each_map.split('circle" coords="')[1].split('" />')[0]
        circle_part_str ='<area target="" alt="%s_CONTROL_BACK" title="%s_CONTROL_BACK" href="javascript:advanceExperiment(\\\'back\\\')" coords="'%(name,name) + circle_coords +'" shape="circle">'
        if 'rect" coords="' in each_map:
            rect_coords = each_map.split('rect" coords="')[1].split('" />')[0]
            second_part = '<area target="" alt="%s_CONTROL_LOGIN" title="%s_CONTROL_LOGIN" href="javascript:advanceExperiment(\\\'login\\\')" coords="'%(name,name) + rect_coords + '" shape="rect"></map>\',\n'
        elif 'poly" coords="' in each_map:
            poly_coords = each_map.split('poly" coords="')[1].split('" />')[0]
            second_part = '<area target="" alt="%s_CONTROL_LOGIN" title="%s_CONTROL_LOGIN" href="javascript:advanceExperiment(\\\'login\\\')" coords="'%(name,name) + poly_coords + '" shape="poly"></map>\',\n'
        if toolbar == True:
            final_str += "'" + name + "'"  + ':\'<map id="scaleMap0" name="'+ name + '">' + circle_part_str + second_part
        else:
            final_str += "'" + name + "12'" + ':\'<map id="scaleMap0" name="' + name + '12_map">' + circle_part_str + second_part


    final_str = final_str[:-2] + '};\n\n'
    with open(jsFile, 'r') as trg:
        target = trg.read()

    target = final_str + target
    with open(outFile, 'w') as trg:
        trg.write(target)


if __name__ == '__main__':
    if len(sys.argv) != 5:
        print  "Usage ./rtf2js.py RTF_file src_JS_file dst_JS_file country_code"
        sys.exit(1)
    rtf2js(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],toolbar=False)
